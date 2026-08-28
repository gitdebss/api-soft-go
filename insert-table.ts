import { sql } from './sql.ts'

sql`
INSERT INTO ride (date, hour, city, name, phone)VALUES ('2025-08-10', '13:30', 'Porto Alegre', 'Maria Silva', '+5551999999999');
`.then(() => {
    console.log('registro inserido')
})