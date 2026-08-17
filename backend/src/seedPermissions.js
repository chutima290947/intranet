import { pool } from './db.js'
import { PERMISSION_CATALOG, ACTIONS } from './permissionCatalog.js'

// รันสคริปต์นี้ครั้งเดียวหลังสร้างตารางเสร็จ: node src/seedPermissions.js
// จะสร้าง: 1) permission ทุก resource x action  2) role 'super_admin' ที่มีสิทธิ์ทุกอย่าง
// 3) ผูก admin_users แถวเดิม (ที่ยังไม่มี role_id) เข้ากับ super_admin
async function seed() {
  console.log('กำลังสร้าง permission catalog...')
  for (const { resource, label } of PERMISSION_CATALOG) {
    for (const action of ACTIONS) {
      await pool.query(
        `INSERT INTO permissions (resource, resource_label, action)
         VALUES ($1, $2, $3)
         ON CONFLICT (resource, action) DO UPDATE SET resource_label = EXCLUDED.resource_label`,
        [resource, label, action]
      )
    }
  }

  console.log('กำลังสร้าง role super_admin...')
  const { rows: roleRows } = await pool.query(
    `INSERT INTO roles (name, label)
     VALUES ('super_admin', 'ผู้ดูแลระบบสูงสุด')
     ON CONFLICT (name) DO UPDATE SET label = EXCLUDED.label
     RETURNING id`
  )
  const superAdminRoleId = roleRows[0].id

  const { rows: allPerms } = await pool.query('SELECT id FROM permissions')
  for (const p of allPerms) {
    await pool.query(
      `INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [superAdminRoleId, p.id]
    )
  }

  console.log('กำลังผูก admin_users เดิมเข้ากับ super_admin...')
  await pool.query(
    `UPDATE admin_users SET role_id = $1 WHERE role_id IS NULL`,
    [superAdminRoleId]
  )

  console.log('✅ เสร็จสิ้น')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ seed ไม่สำเร็จ', err)
  process.exit(1)
})