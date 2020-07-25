import React, {useState, useEffect} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import Title from './Title';

function createData(name, amount) {
    return { "name": name, "value": amount };
}

function generateData(json_data){
    var data = [];

    for (var type in json_data) {
        data.push(createData(type,json_data[type]));
    }
    return data;

}

export default function PieComponent(props) {
    const theme = useTheme();
    const [data, setData] = useState({});
    useEffect(() => {
        setData(generateData(props.data));
    }, []);

    return (
        <React.Fragment>
            <Title>{props.title}</Title>
            <ResponsiveContainer>
                <PieChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={90} outerRadius={180} fill="#82ca9d" label />
                    <Tooltip/>
                </PieChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}