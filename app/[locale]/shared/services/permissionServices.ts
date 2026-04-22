// import { Connection } from "mysql2/promise";
// import { PermissionType } from "../public/types/dbTablesTypes/permissionType";

// export class PermissionServices {
//     public async getUserPermissions(userId: number, conn: Connection) {
//         const sql = `
// SELECT p.permission_name FROM users u
//     LEFT JOIN roles r
//         ON r.role_id = u.role_id
//     LEFT JOIN role_permissions rs
//         ON rs.role_id = r.role_id
//     LEFT JOIN permissions p
//         ON rs.permission_id = p.permission_id
// WHERE u.user_id = ?
// `;
//         const [results] = await conn.query(sql, [userId]);
//         const data = results as PermissionType[];
//         const permissionNames: string[] = data.map(
//             p => p.permission_name
//         );

//         console.log(permissionNames)
//         return permissionNames;
//     }
// }