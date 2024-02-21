import { onGetClients, getClient, onGetCompany, saveClients, deleteClient, writeClients } from './db_conection.js';

const formClient = document.getElementById("clientControlForm")
const tableClients = document.getElementById("clients_table")
let editStatus = false;
let id = "";
let title = document.getElementById("action_title");

formClient.addEventListener("submit", async (e) => {
    e.preventDefault();
    let formobjet = new FormData(formClient);
    var data = {};
    // var bool = confirm("Seguro que desea Actualizar este cliente?")
    for (const [key, value] of formobjet) {
        data[key] = value
    }
    try {
        if (!editStatus) {
            await saveClients(data);        
        } else {
            await writeClients(id, data)
            editStatus = false;
            id = "";
            title.innerHTML = "Agregar Cliente"
        }
        formClient.reset();
    } catch (error) {
        console.log(error);
    }
});

window.addEventListener("DOMContentLoaded", async (e) => {
    onGetClients((querySnapshot) => {
        let num_clients = querySnapshot.docs.map((v, i) => v.data()).length;
        let clients_card = document.getElementById("client_title");
        clients_card.innerHTML = num_clients
        tableClients.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const client = doc.data();
            tableClients.innerHTML += `
            <tr>
                <td>
                    ${client.name}
                </td>
                <td>
                    ${client.lastname}
                </td>
                <td>
                    ${client.address}
                </td>
                <td>
                    ${client.city}
                </td>
                <td>
                    ${client.country}
                </td>
                <td>
                    ${client.code}
                </td>
                <td>
                    <button class="btn btn-primary btn-delete" data-id="${doc.id}">
                        Eliminar
                    </button>
                    <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
                        Editar
                    </button>
                </td>
            </tr>`
        });
        
        // ------ DELETE USERS ------
        let btnsDelete = tableClients.querySelectorAll(".btn-delete");
        btnsDelete.forEach((btn) =>
            btn.addEventListener("click", async ({ target: { dataset } }) => {
                var bool = confirm("Seguro que desea eliminar este registro")
                try {
                    if(bool) {
                        await deleteClient(dataset.id);
                    }
                } catch (error) {
                    alert("Ocurrio un Error")
                }
            })
        );

        // ------ EDIT USERS ------
        let btnsEdit = tableClients.querySelectorAll(".btn-edit");
        btnsEdit.forEach((btn) => {
            btn.addEventListener("click", async(e) => {
                const doc = await getClient(e.target.dataset.id);
                const client = doc.data();
                for (const propiedad in client) {
                    document.getElementsByName(propiedad)[0].value = client[propiedad];
                }
                editStatus = true;
                id = doc.id;
                title.innerHTML = "Editar Cliente"

            })
        });
    });

    onGetCompany((querySnapshot) => {
        let company = querySnapshot.docs.map((v, i) => v.data())[0]
        let company_title = document.getElementById("company_title");
        let manager_title = document.getElementById("manager_title");
        let country_title = document.getElementById("country_title");
        let clients_title = document.getElementById("client_title");
        company_title.innerHTML = company.name
        manager_title.innerHTML = company.manager_name
        country_title.innerHTML = company.country
        clients_title.innerHTML = querySnapshot.docs.length
    });
    
});

