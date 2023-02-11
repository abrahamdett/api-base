import ClientsTable from '../models/Client';

export const getClients = async (req, res) => {
    try {
        const clients = await ClientsTable.findAll();
        res.status(200).json({
            message: 'Clients listed successfully',
            data: clients
        });
    }catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    }    
};


export const createClient = async (req, res) => {
    const { name, contact, phone, email, tickets, logos, imageurllogo, status } = req.body;

    try {
        let newClient = await ClientsTable.create({
            name,
            contact,
            phone,
            email,
            tickets,
            logos,
            imageurllogo,
            status
        }, {
            fields: ['name', 'contact', 'phone', 'email', 'tickets', 'logos', 'imageurllogo', 'status']
        });

        if (newClient) {
            return res.status(201).json({
                message: 'Client created successfully',
                data: newClient
            });
        }
    }catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    }
};

export const getClientById = async (req, res) => {
    const { clientId } = req.params;

    try {
        const client = await ClientsTable.findOne({
            where: {
                id: clientId,
            }
        });

        res.status(200).json({
            message: 'Client found successfully',
            data: client
        });
    }catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    }
};

export const updateClientById = async (req, res) => {
    const { clientId } = req.params;
    const { name, contact, phone, email, tickets, logos, imageurllogo, status } = req.body;

    try {
        const client = await ClientsTable.findOne({
            where: {
                id: clientId,
            }
        });

        if (client) {
            await ClientsTable.update({
                name,
                contact,
                phone,
                email,
                tickets,
                logos,
                imageurllogo,
                status
            }, {
                where: {
                    id: clientId
                }
            });

            res.status(200).json({
                message: 'Client updated successfully',
                data: client
            });
        } else {
            res.status(404).json({
                message: 'Client not found',
                data: {}
            });
        }
    }catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    }
};

export const deleteClientById = async (req, res) => {
    const { clientId } = req.params;

    try {
        const client = await ClientsTable.findOne({
            where: {
                id: clientId,
            }
        });

        if (client) {
            await ClientsTable.update({
                status: 0
            },{
                where: {
                    id: clientId
                }
            });

            res.status(200).json({
                message: 'Client deleted successfully',
                data: client
            });
        } else {
            res.status(404).json({
                message: 'Client not found',
                data: {}
            });
        }
    }catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    }
};