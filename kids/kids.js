import AppError from "../utils/app-error.js";
import createSupabaseClient from "../utils/create-supabase-client.js";

export async function addKid(req, res, next) {
    const full_name = req.body.full_name;
    const user_id = req.body.user_id ?? req.user.id;
    const classroom = req.body.classroom;
    const is_confirmed = req.user.role === 'admin';

    const client = await createSupabaseClient();

    const {error} = await client.from('kids').insert({
        full_name,
        user_id,
        classroom,
        is_confirmed
    });

    if(error){
        throw new AppError("Could not add kid", 500, error);
    }

    return res.sendStatus(200);
}

export async function getKidsOf(req, res, next) {
    const client = await createSupabaseClient();
    const user_id = req.params.id;

    const { data, error } = await client.from("kids").select("*").eq("user_id", user_id);

    if(error){
        throw new AppError("Could not getting kids", 500, error);
    }

    res.send(data);
}

export async function getAllKids(req, res, next) {
    if(req.user.role !== 'admin') {
        throw new AppError("You are not allowed to access this resource", 403);
    }

    const client = await createSupabaseClient();

    const { data, error } = await client.from("kids").select("*");

    if(error){
        throw new AppError("Could not getting all kids", 500, error);
    }

    res.send(data);
}

export async function callKid(req, res, next) {
    try {
        const kidId = req.params.id;
        const userId = req.user.id; 
        const client = await createSupabaseClient();

        const { data: kid, error: kidError } = await client
            .from('kids')
            .select('*')
            .eq('id', kidId)
            .single();

        if (kidError || !kid) {
            throw new AppError('Kid not found', 404);
        }

        const { error: callError } = await client
            .from('calls')
            .insert({ 
                user_id: userId, 
                kid_id: kidId 
            });

        if (callError) {
            throw new AppError("Could not log the call to active calls", 500, callError);
        }

        const { error: logError } = await client
            .from('call_logs')
            .insert({ 
                user_id: userId, 
                kid_id: kidId 
            });

        if (logError) {
            throw new AppError("Could not append to call logs history", 500, logError);
        }

        return res.status(200).json({ 
            status: 'success', 
            message: 'Call initiated, persisted in active calls, and appended to history logs successfully' 
        });

    } catch (err) {
        next(err);
    }
}

export async function confirmKid(req, res, next) {
    try {
        if (req.user.role !== 'admin') {
            throw new AppError('Only admins can confirm a kid', 403);
        }

        const kidId = req.params.id;
        const client = await createSupabaseClient();

        const { data, error } = await client
            .from('kids')
            .update({ is_confirmed: true })
            .eq('id', kidId)
            .select()
            .single();

        if (error || !data) {
            throw new AppError('Kid not found', 404);
        }

        return res.status(200).json({
            status: 'success',
            data
        });
    } catch (err) {
        next(err);
    }
}