let inventory = [];

    // Fonction pour ajouter un médicament à l'inventaire
    function addMedicine() {
        const name = document.getElementById("medicineName").value;
        const quantity = document.getElementById("quantity").value;
        const expiryDate = document.getElementById("expiryDate").value;

        if (name && quantity && expiryDate) {
            const medicine = { name, quantity, expiryDate };
            inventory.push(medicine);
            displayInventory();
            checkExpiry();
            clearForm();
        } else {
            alert("Veuillez remplir tous les champs.");
        }
    }

    // Fonction pour afficher l'inventaire
    function displayInventory() {
        const inventoryTable = document.getElementById("inventoryTable").getElementsByTagName('tbody')[0];
        inventoryTable.innerHTML = "";  // Réinitialiser le tableau

        inventory.forEach((item, index) => {
            const row = inventoryTable.insertRow();
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.expiryDate}</td>
                <td>
                    <button onclick="removeMedicine(${index})">Supprimer</button>
                </td>
            `;
        });
    }

    // Fonction pour supprimer un médicament
    function removeMedicine(index) {
        inventory.splice(index, 1);
        displayInventory();
        checkExpiry();
    }

    // Fonction pour vérifier les médicaments proches de la péremption
    function checkExpiry() {
        const expiryAlert = document.getElementById("expiryAlert");
        const today = new Date();
        let alertMessage = "";

        inventory.forEach(item => {
            const expiryDate = new Date(item.expiryDate);
            const timeDiff = expiryDate - today;
            const daysToExpire = Math.ceil(timeDiff / (1000 * 3600 * 24));

            if (daysToExpire <= 30) {  // Médicaments qui expirent dans 30 jours ou moins
                alertMessage += `${item.name} expire dans ${daysToExpire} jours (le ${item.expiryDate}).<br>`;
            }
        });

        expiryAlert.innerHTML = alertMessage ? alertMessage : "Aucun médicament proche de la péremption.";
    }

    // Fonction pour réinitialiser le formulaire après ajout
    function clearForm() {
        document.getElementById("medicineName").value = "";
        document.getElementById("quantity").value = "";
        document.getElementById("expiryDate").value = "";
    }
