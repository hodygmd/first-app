import { API_URL, API_TOKEN } from '@env';
const url=API_URL
const token=API_TOKEN
export async function getPuestos() {
    const PUESTOS=`${url}puesto`
    try {
        const rawData = await fetch(PUESTOS, {
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
            const { id, nombre,status } = item;
            return{
                id,
                nombre,
                status
            }
        });
    } catch (error) {
        console.error('Error fetching puestos:', error);
        return error
    }
}
export async function getMedidas() {
    const MEDIDAS=`${url}unidad-medida`
    try {
        const rawData = await fetch(MEDIDAS, {
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
            const { id, unidad,status } = item;
            return{
                id,
                unidad,
                status
            }
        });
    } catch (error) {
        console.error('Error fetching medidas:', error);
        return error
    }
}
export async function getFunciones() {
    const FUNCIONES=`${url}funcion`
    try {
        const rawData = await fetch(FUNCIONES, {
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
            const { id, nombre, descripcion, status } = item;
            return{
                id,
                nombre,
                descripcion,
                status
            }
        });
    } catch (error) {
        console.error('Error fetching funciones:', error);
        return error
    }
}