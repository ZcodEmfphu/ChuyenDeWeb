import { useEffect, useRef, useState } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line
} from 'recharts';
import {User} from '../../type';
import Typed from 'typed.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



function Home() {
    let date = new Date().getFullYear();

    const typedTextRef = useRef<HTMLSpanElement>(null);

    const [users, setUsers] = useState<User[]>([]);
    const [restaurant, setRestaurant] = useState([]);
    const [products, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/my/user/getAllUser`);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();

            const usersData: User[] = data.map((item: any) => ({
                _id: item._id,
                email: item.email,
                name: item.name,
                addressLine1: item.addressLine1,
                city: item.city,
                country: item.country,
            }));
            setUsers(usersData);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchUsers();

        if (typedTextRef.current) {
            const options = {
                strings: [
                    "This is ChuyenDeWeb Web Site...",
                    "Khoa Cong Nghe Thong Tin...",
                    "...Nong Lam University...",
                    "...Developed by Nhom ..."
                ],
                typeSpeed: 100,
                backSpeed: 100,
                backDelay: 1000,
                loop: true,
            };

            const typed = new Typed(typedTextRef.current, options);

            return () => {
                typed.destroy();
            };
        }

    }, []);

    const data = [
        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    ];

    return (
        <main className="main-container">
            <div className="main-title">
                <h3>ADMIN DASHBOARD <span style={{ marginInlineStart: "200px" }} ref={typedTextRef}></span></h3>
            </div>
            <div className="main-cards">
                <div className="card">
                    <div className="card-inner">
                        <h3>PRODUCTS</h3>
                        <BsFillArchiveFill className="card-icon" />
                    </div>
                    <h1>0</h1>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <h3>RESTAURANTS</h3>
                        <BsFillGrid3X3GapFill className="card-icon" />
                    </div>
                    <h1>0</h1>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <h3>CUSTOMERS</h3>
                        <BsPeopleFill className="card-icon" />
                    </div>
                    <h1>{isLoading ? 'Loading...' : users.length}</h1>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <h3>ALERTS</h3>
                        <BsFillBellFill className="card-icon" />
                    </div>
                    <h1>0</h1>
                </div>
            </div>
            <div className="charts">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            &copy; ChuyenDeWeb {date}
        </main>
    );
}

export default Home;
