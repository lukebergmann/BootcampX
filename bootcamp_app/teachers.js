const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'vagrant'
})


const queryString =`
SELECT DISTINCT teachers.name AS teacher, cohorts.name as cohorts
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = $1
GROUP BY cohorts.name, teachers.name
ORDER BY teacher
`
const cohortName = [process.argv[2]];

pool.query(queryString, cohortName)
  .then(res => {
    console.log(res.rows)
    res.rows.forEach(user => {
      console.log(`${user.teacher} ${user.cohorts}`);
    })

  }).catch(err => console.error('query error', err.stack));