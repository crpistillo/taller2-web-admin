import React, {useState, useEffect} from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
    BarChart,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    Bar,
    ResponsiveContainer,
    Label
} from 'recharts';
import Title from './Title';
import Subtitle from './Subtitle';

function createData(name, amount) {
    return { "name": name, "calls": amount };
}

function generateData(json_data){
    json_data = json_data.filter(function filtro(value){return value<0.20;})
    var bins = new Array(101).fill(0)
    var bins_amount = 100; // Lo elegi yo esteticamente
    var min = Math.min(...json_data);
    var max = Math.max(...json_data);
    var step = (max-min)/bins_amount;

    json_data.forEach(value => {
        var bin = Math.floor( (value-min)/(max-min)*bins_amount );
        bins[bin]++;
    })

    var data = [];
    //Lo dejo en la forma del barchart
    bins.forEach((value, index) => {
        data.push(createData(Math.trunc(1000*(index*step+min))/1000, value));
    })

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
            <Subtitle>
                {props.subtitle}
            </Subtitle>
            <ResponsiveContainer>
                <BarChart width={900} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" unit={"s"}/>
                    <YAxis>
                        <Label
                            angle={270}
                            position="insideLeft"
                            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                        >
                            {props.ylabel}
                        </Label>
                    </YAxis>
                    <Tooltip />
                    <Bar dataKey="calls" fill="#8884d8"/>
                </BarChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}


