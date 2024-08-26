import { API_URL, API_TOKEN } from '@env';
const url=API_URL
const token=API_TOKEN
export async function login(username,password) {
    const LOGIN=`${url}empleado/login`
    try {
        const rawData = await fetch(LOGIN, {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                username,
                password
            }),
        });

        if (!rawData.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await rawData.json();
        
        return json
    } catch (error) {
        console.error('Error login:', error);
        return error
    }
}
export async function updatePassword(clave,password) {
    const UPDATEPASSWORD=`${url}empleado/update-pass/${clave}`
    try {
        const rawData = await fetch(UPDATEPASSWORD, {
            method: 'PUT',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                clave,
                password
            })
        });

        if (!rawData.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await rawData.json();
        
        return json
    } catch (error) {
        console.error('Error update password:', error);
        return error
    }
}
export async function updateUser(clave,nombre,username,id_puesto) {
    const UPDATE=`${url}empleado/update/${clave}`
    try {
        const rawData = await fetch(UPDATE, {
            method: 'PUT',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                clave,
                nombre,
                username,
                id_puesto,
                status:1
            })
        });

        if (!rawData.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await rawData.json();
        
        return json
    } catch (error) {
        console.error('Error update password:', error);
        return error
    }
}