const pool = require("../config/db");

//  Get All Partners
const getPartners = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM partner_organizations ORDER BY created_at DESC",
    );
    res.json({ data: result.rows, total: result.rows.length });
  } catch (err) {
    console.error("getPartners error:", err);
    res.status(500).json({ error: "Server error." });
  }
};

//  Add Partner
const addPartner = async (req, res) => {
  try {
    const { name, email, country } = req.body;

    if (!name) {
      return res.status(400).json({ error: "name is required." });
    }

    const result = await pool.query(
      `INSERT INTO partner_organizations (name, email, country)
       VALUES ($1, $2, $3) RETURNING *`,
      [name, email, country],
    );

    res.status(201).json({ success: true, partner: result.rows[0] });
  } catch (err) {
    console.error("addPartner error:", err);
    res.status(500).json({ error: "Server error." });
  }
};

//  Update Partner
const updatePartner = async (req, res) => {
  try {
    const { name, email, country, is_active } = req.body;

    const result = await pool.query(
      `UPDATE partner_organizations
       SET name      = COALESCE($1, name),
           email     = COALESCE($2, email),
           country   = COALESCE($3, country),
           is_active = COALESCE($4, is_active)
       WHERE id = $5 RETURNING *`,
      [name, email, country, is_active, req.params.id],
    );

    if (!result.rows[0]) {
      return res.status(404).json({ error: "Partner not found." });
    }

    res.json({ success: true, partner: result.rows[0] });
  } catch (err) {
    console.error("updatePartner error:", err);
    res.status(500).json({ error: "Server error." });
  }
};

//  Delete Partner
const deletePartner = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM partner_organizations WHERE id = $1 RETURNING *",
      [req.params.id],
    );

    if (!result.rows[0]) {
      return res.status(404).json({ error: "Partner not found." });
    }

    res.json({ success: true, message: "Partner deleted successfully." });
  } catch (err) {
    console.error("deletePartner error:", err);
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = { getPartners, addPartner, updatePartner, deletePartner };
