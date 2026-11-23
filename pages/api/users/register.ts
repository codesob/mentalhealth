import type { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import prisma from '../../../lib/prisma';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password, fullName } = req.body ?? {};
  const name = typeof fullName === 'string' ? fullName.trim() : '';
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

  if (!name || name.length > 100) {
    return res.status(400).json({ message: 'Please enter your name.' });
  }
  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }
  if (typeof password !== 'string' || password.length < MIN_PASSWORD_LENGTH) {
    return res
      .status(400)
      .json({ message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const user = await prisma.user.create({
      data: { email: normalizedEmail, name, password: await hash(password, 12) },
      select: { id: true, email: true, name: true },
    });

    return res.status(201).json(user);
  } catch (err) {
    console.error('register failed', err);
    return res.status(500).json({ message: 'Could not create your account. Please try again.' });
  }
}
