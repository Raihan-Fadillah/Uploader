const fs = require("fs");
const path = require("path");

const userDB = path.join(__dirname, "../../../database/user.json");

function readUsers() {
  try {
    return JSON.parse(fs.readFileSync(userDB, "utf-8"));
  } catch (err) {
    console.error("Gagal membaca user.json:", err.message);
    return [];
  }
}

function writeUsers(users = []) {
  try {
    fs.writeFileSync(userDB, JSON.stringify(users, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Gagal menulis user.json:", err.message);
    return false;
  }
}

const accessControl = require("../../../middleware/accessControl");

module.exports = {
  path: "/api/clearalluser",
  method: "post", // gunakan POST untuk operasi hapus
  middleware: [
    accessControl({ secret: true, owner: true })
  ],

  info: [
    {
      name: "Clear All User",
      status: "Ready",
      method: "POST",
      desc: "Menghapus seluruh data user dari database",
      params: []
    }
  ],

  execution: async (req, res) => {
    try {
      const success = writeUsers([]);
      if (!success) {
        return res.status(500).json({
          creator: "Raihan Fadillah",
          status: false,
          message: "Gagal menghapus data user"
        });
      }

      return res.json({
        creator: "Raihan Fadillah",
        status: true,
        message: "Semua user berhasil dihapus",
        total_deleted: readUsers().length // seharusnya 0
      });
    } catch (e) {
      console.error("Gagal clear user:", e.message);
      return res.status(500).json({
        creator: "Raihan Fadillah",
        status: false,
        message: e.message
      });
    }
  }
};