const pool = require("./db");

const createTables = async () => {
  try {
    await pool.query(`

      -- Admin Users
      CREATE TABLE IF NOT EXISTS admin_users (
        id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email       VARCHAR(255) UNIQUE NOT NULL,
        password    VARCHAR(255) NOT NULL,
        name        VARCHAR(255) NOT NULL,
        role        VARCHAR(50) NOT NULL DEFAULT 'ADMIN',
        is_active   BOOLEAN NOT NULL DEFAULT true,
        created_at  TIMESTAMP DEFAULT NOW(),
        updated_at  TIMESTAMP DEFAULT NOW()
      );

      -- Admin Sessions
      CREATE TABLE IF NOT EXISTS admin_sessions (
        id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        admin_id      UUID REFERENCES admin_users(id) ON DELETE CASCADE,
        refresh_token TEXT NOT NULL,
        expires_at    TIMESTAMP NOT NULL,
        created_at    TIMESTAMP DEFAULT NOW(),
        updated_at    TIMESTAMP DEFAULT NOW()
      );

      -- Partner Organizations
      CREATE TABLE IF NOT EXISTS partner_organizations (
        id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name        VARCHAR(255) NOT NULL,
        email       VARCHAR(255),
        country     VARCHAR(100),
        is_active   BOOLEAN NOT NULL DEFAULT true,
        created_at  TIMESTAMP DEFAULT NOW(),
        updated_at  TIMESTAMP DEFAULT NOW()
      );

      -- Notification Templates
      CREATE TABLE IF NOT EXISTS notification_templates (
        id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title       VARCHAR(255) NOT NULL,
        message     TEXT NOT NULL,
        type        VARCHAR(50) NOT NULL DEFAULT 'INFO',
        created_at  TIMESTAMP DEFAULT NOW(),
        updated_at  TIMESTAMP DEFAULT NOW()
      );

      -- Admin Activity Log
      CREATE TABLE IF NOT EXISTS admin_activity_log (
        id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        admin_id    UUID REFERENCES admin_users(id) ON DELETE SET NULL,
        action      VARCHAR(255) NOT NULL,
        resource    VARCHAR(255),
        resource_id VARCHAR(255),
        details     JSONB,
        created_at  TIMESTAMP DEFAULT NOW(),
        updated_at  TIMESTAMP DEFAULT NOW()
      );

    `);

    console.log("✅ All tables created successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating tables:", err);
    process.exit(1);
  }
};

createTables();
