const bcrypt = require('bcryptjs');
const pool   = require('./db');

const seed = async () => {
  try {
    const password = process.env.SEED_ADMIN_PASSWORD;

    if (!password) {
      console.error('❌ SEED_ADMIN_PASSWORD not set in .env');
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO admin_users (email, password, name, role)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO NOTHING`,
      ['admin@urimpact.com', hashedPassword, 'Super Admin', 'SUPER_ADMIN']
    );

    console.log('✅ Admin user created');
    process.exit(0);

  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
};

seed();