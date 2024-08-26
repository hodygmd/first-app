import { API_URL, API_TOKEN } from '@env';
const url=API_URL
const token=API_TOKEN
export async function getPresentaciones(){
    const CATEGORIAS=`${url}presentacion`
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
            const { id, nombre, descripcion, id_unidad_medida: {id:unidad_id, unidad:unidad_nombre, status:unidad_status},medida,status } = item;
            return{
                id,
                nombre,
                descripcion,
                unidad_id,
                unidad_nombre,
                unidad_status,
                medida,
                status
            }
        });
    } catch (error) {
        console.error('Error fetching presentaciones:', error);
        return error
    }
}
export async function createPresentacion(nombre,descripcion,id_unidad_medida,medida){
    const CREATE=`${url}presentacion/create`
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
                id_unidad_medida,
                medida,
                status:1
            }),
        });

        if (!rawData.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await rawData.json();
        
        return json
    } catch (error) {
        console.error('Error creating presentaciones:', error);
        return error
    }
}
export async function updatePresentacion(id,nombre,descripcion,id_unidad_medida,medida){
    const UPDATE=`${url}presentacion/update/${id}`
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
                id_unidad_medida,
                medida,
                status:1
            }),
        });

        if (!rawData.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await rawData.json();
        
        return json
    } catch (error) {
        console.error('Error updating presentaciones:', error);
        return error
    }
}
export async function deletePresentacion(id){
    const DELETE=`${url}presentacion/delete/${id}`
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
        console.error('Error deleting presentaciones:', error);
        return error
    }
}