import { API_URL, API_TOKEN } from '@env';
const url=API_URL
const token=API_TOKEN
export async function getCategorias(){
    const CATEGORIAS=`${url}categoria`
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
            const { id, nombre, id_funcion: { id: funcion_id, nombre: funcion_nombre, descripcion: funcion_descripcion, status: funcion_status },status } = item;
            return{
                id,
                nombre,
                funcion_id,
                funcion_nombre,
                funcion_descripcion,
                funcion_status,
                status
            }
        });
    } catch (error) {
        console.error('Error fetching categorias:', error);
        return error
    }
}
export async function createCategoria(nombre,id_funcion){
    const CREATE=`${url}categoria/create`
    try {
        const rawData = await fetch(CREATE, {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre,
                id_funcion,
                status:1
            }),
        });

        if (!rawData.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await rawData.json();
        return json
    } catch (error) {
        console.error('Error creating categoria:', error);
        return error
    }
}
export async function updateCategoria(id,nombre,id_funcion){
    const UPDATE=`${url}categoria/update/${id}`
    try {
        const rawData = await fetch(UPDATE, {
            method: 'PUT',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre,
                id_funcion,
                status:1
            }),
        });

        if (!rawData.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await rawData.json();
        return json
    } catch (error) {
        console.error('Error updating categoria:', error);
        return error
    }
}
export async function deleteCategoria(id){
    const DELETE=`${url}categoria/delete/${id}`
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
        return json
    } catch (error) {
        console.error('Error deleting categoria:', error);
        return error
    }
}