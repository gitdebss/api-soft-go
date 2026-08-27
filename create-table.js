import { sql } from './sql.js'

sql`
CREATE TABLE ride (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    hour TIME NOT NULL,
    city VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL
);
`.then(() => {
    console.log('tabela criada')
})