'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function BankOfInfoCard() {
    const [Info, setInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/tip', {
                    params: {
                        lang: 'ar'
                    },
                });
                setInfo(response.data.Tip);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <div
            className="w-full flex flex-col items-center justify-center p-4"
            style={{ zIndex: 10 }}
        >
            <div className="relative w-full flex items-center justify-center">
                <div className="relative w-full flex items-center justify-center">
                    <div
                        className="w-[98vw] max-w-[1800px] bg-white/10 backdrop-blur-[50px] rounded-3xl shadow-2xl border border-[#00A591]/20 flex flex-col justify-center items-center mx-auto overflow-hidden"
                        style={{
                            marginTop: '120px',
                            marginBottom: '24px',
                            minHeight: 'calc(75vh)',
                        }}
                    >
                        <div
                            className="w-[750px] bg-white/10 backdrop-blur-[50px] rounded-3xl shadow-2xl border border-[#00A591]/20 flex flex-col justify-center items-center overflow-hidden p-8"
                            style={{
                                minHeight: '100px',
                            }}
                        >
                            {Info ? (
                                <div
                                    className="text-black text-xl leading-relaxed text-center font-medium whitespace-pre-line font-poppins"
                                >
                                    {typeof Info === 'string'
                                        ? Info
                                        : JSON.stringify(Info, null, 2)}
                                </div>
                            ) : (
                                <span className="text-black text-xl font-semibold font-poppins">Loading...</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
