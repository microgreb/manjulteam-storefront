import ApiSettings from './../../api/ApiSettings'
import axios from 'axios'

export default {
    state: {
        user: null,
    },
    getters: {
        accessToken(state) {
            return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjljMDBjYWMyMDc3NzdmOWFlNTc3MDI4MmQ3NTVhZjFmOTk3Y2Y3M2I2NzcyMTJhZDI4MGEzNGMxNTA5MDI0MTczYWUzNmM0NjljZmNhMjgyIn0.eyJhdWQiOiIyIiwianRpIjoiOWMwMGNhYzIwNzc3N2Y5YWU1NzcwMjgyZDc1NWFmMWY5OTdjZjczYjY3NzIxMmFkMjgwYTM0YzE1MDkwMjQxNzNhZTM2YzQ2OWNmY2EyODIiLCJpYXQiOjE1NzIyNzYzNzIsIm5iZiI6MTU3MjI3NjM3MiwiZXhwIjoxNTczNTcyMzcyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.W-h-7-XEkirEbmtWWG9z-Nm0XmmBJIQA-_1D7I3aBLHhHC6YTJjEEsZs_ZxfeGv_u7tqOzAWdURmheiLVEYvvIeM71Jrl3rouHHtgyIMH8eqJuun0_ogIw25mo88_JfWBAs8tqaT7KdMf87TPsieaY5JA56fBxMybDSd5JcgJ4fnROPrK53eNqpGHdSZH-KjCNVWBrB0oMH6o9pf_zCITHCC0pojnkWCxvnxwwgOvlrulSaUZN2vBQjydF-WGo_ujVp89DZa8bndN75_CdPCh9vsIUmjk-nRNEV-TFVuuhaQEbEdWUoeAJhdix1_IdqjTXism9PbdAvoxfYALvhlgX2CttyaZ__DqrfVp3taxczsKy7k9CO8FKlZGugihNloK4i4cn6ApjkawkHkeZm_9Ahw6GWMSCujd1XJ_BY5vReaqPdacWVjUH6cIXNXb73HDDoNWk2FxI9MdWceXrsnVxWUVow-2CgGZVaJ_jxXMWICaXajQuQLo3iTcF2z_hWUARHkZ35HDd3WgcJJDmqiIJcosSd6KA1UOmH6f5z_NCPel8IY44oHJUuwgRPqIuh4d-PFIUVaLFNSUDlnyUK7lG5kp8HZLbiCVCdppuvGRdohzvbO5HqHQXEWm_iJ-WBA_2SJQdvn15kq42xhlIRokFlmTErHd9HNiyM7QryGgmg';
            return (state.user) ? state.user.access_token : null
        },
    },
    mutations: {

    },
    actions: {
        
    }
}
