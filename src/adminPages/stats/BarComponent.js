import React, {useState, useEffect} from 'react';
import { useTheme } from '@material-ui/core/styles';
import {BarChart, CartesianGrid, LabelList, Tooltip, XAxis, YAxis, Bar, Legend, ResponsiveContainer} from 'recharts';
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

export default function BarComponent(props) {
    const theme = useTheme();
    const [data, setData] = useState({});
    useEffect(() => {
        setData(generateData(props.data));
    }, []);

    return (
        <React.Fragment>
            <Title>{props.title}</Title>
            <ResponsiveContainer>
                <BarChart width={730} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={270}/>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />

                </BarChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}