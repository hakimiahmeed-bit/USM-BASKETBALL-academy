// Vercel Serverless Function, triggered on a schedule by vercel.json's "crons".
// Replaces admin/cron_appel_cotisation.php: emails players whose 30-day
// membership cycle is due in exactly 3 days.
//
// Needs two environment variables set in Vercel (Project Settings -> Environment Variables):
//   FIREBASE_SERVICE_ACCOUNT_KEY  -> paste the full JSON from
//     Firebase Console -> Project Settings -> Service Accounts -> Generate new private key
//   RESEND_API_KEY -> from https://resend.com (free tier), used to actually send the email
//
// If RESEND_API_KEY isn't set, the function still runs and logs who *would*
// have been emailed, so you can wire up email whenever you're ready.

import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

function getDb() {
  if (!getApps().length) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    initializeApp({ credential: cert(serviceAccount) })
  }
  return getFirestore()
}

async function sendEmail(to, nom, echeance) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[dry-run] would email ${to}: cotisation due ${echeance}`)
    return
  }
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Basket Academy <no-reply@yourdomain.com>',
      to,
      subject: '🏀 Rappel de Cotisation - Académie de Basketball',
      text: `Bonjour ${nom},\n\nVotre prochaine échéance de cotisation approche : ${echeance} (dans 3 jours).\nMerci de régulariser votre cotisation auprès de l'administration.\n\nL'équipe Basket Academy`,
    }),
  })
}

export default async function handler(req, res) {
  try {
    const db = getDb()
    const snap = await db.collection('users').where('role', '==', 'client').get()

    let sent = 0
    const today = new Date()

    for (const docSnap of snap.docs) {
      const u = docSnap.data()
      const base = u.dateDernierPaiement ? new Date(u.dateDernierPaiement)
        : (u.createdAt?.toDate ? u.createdAt.toDate() : null)
      if (!base) continue

      const joursEcoules = Math.floor((today - base) / (1000 * 60 * 60 * 24))
      const cycleActuel = Math.floor(joursEcoules / 30) + 1
      const prochaineEcheance = new Date(base)
      prochaineEcheance.setDate(prochaineEcheance.getDate() + cycleActuel * 30)

      const joursRestants = Math.floor((prochaineEcheance - today) / (1000 * 60 * 60 * 24))

      if (joursRestants === 3) {
        await sendEmail(u.email, u.nom, prochaineEcheance.toLocaleDateString('fr-FR'))
        sent++
      }
    }

    res.status(200).json({ ok: true, emailsSent: sent })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, error: err.message })
  }
}
