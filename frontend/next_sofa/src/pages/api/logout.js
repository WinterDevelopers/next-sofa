import cookie from 'cookie';

export default async (req, res) => {
    if (req.method === 'POST') {
        res.setHeader('Set-Cookie', [
            cookie.serialize(
                '_acsx', '', {
                    httpOnly: true,
                    //secure: process.env.NODE_ENV !== 'development',
                    expires: new Date(0),
                    sameSite: 'strict',
                    path: '/api/'
                }
            ),
            cookie.serialize(
                '_rfhs', '', {
                    httpOnly: true,
                    //secure: process.env.NODE_ENV !== 'development',
                    expires: new Date(0),
                    sameSite: 'strict',
                    path: '/api/'
                }
            )
        ]);

        return res.status(200).json({
            success: 'Successfully logged out'
        });
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({
            error: `Method ${req.method} not allowed`
        });
    }
};