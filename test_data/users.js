import { expect } from "@playwright/test";

export const users = [
    {
        testScenario : 'login with valid kredensial',
        username : 'standard_user',
        password : 'secret_sauce',
        expected : 'PASS',
    },{
        testScenario : 'Verifikasi sistem menampilkan alert ketika login menggunakan invalid username',
        username : 'username',
        password : 'secret_sauce',
        expected : 'FAIL',
        message : 'Epic sadface: Username and password do not match any user in this service'
    },{
        testScenario : 'Verifikasi sistem menampilkan alert ketika login menggunakan invalid password',
        username : 'standard_user',
        password : 'password',
        expected : 'FAIL',
        message : 'Epic sadface: Username and password do not match any user in this service'
    },{
        testScenario : 'Verifikasi sistem menampilkan alert ketika login menggunakan kredensial kosong',
        username : '',
        password : '',
        expected : 'FAIL',
        message : 'Epic sadface: Username is required'
    }

    
]