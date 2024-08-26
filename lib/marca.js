import { API_URL, API_TOKEN } from '@env';
const url=API_URL
const token=API_TOKEN
export async function getMarcas(){
    const CATEGORIAS=`${url}marca`
    try {
        const rawData = await fetch(CATEGORIAS, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!rawData.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await rawData.json();
        
        return json.map((item)=>{
            const { id, nombre, descripcion,status } = item;
            return{
                id,
                nombre,
                descripcion,
                status
            }
        });
    } catch (error) {
        console.error('Error fetching marcas:', error);
        return error
    }
}
export async function createMarca(nombre,descripcion) {
    const CREATE=`${url}marca/create`
    try {
        const rawData = await fetch(CREATE, {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre,
                descripcion,
                status:1
            }),
        });

        if (!rawData.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await rawData.json();
        
        return json;
    } catch (error) {
        console.error('Error creating marca:', error);
        return error
    }
}
export async function updateMarca(id,nombre,descripcion){
    const UPDATE=`${url}marca/update/${id}`
    try {
        const rawData = await fetch(UPDATE, {
            method: 'PUT',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre,
                descripcion,
                status:1
            }),
        });

        if (!rawData.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await rawData.json();
        
        return json;
    } catch (error) {
        console.error('Error updating marca:', error);
        return error
    }
}
export async function deleteMarca(id){
    const DELETE=`${url}marca/delete/${id}`
    try {
        const rawData = await fetch(DELETE, {
            method: 'PUT',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!rawData.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await rawData.json();
        
        return json;
    } catch (error) {
        console.error('Error deleting marca:', error);
        return error
    }
}