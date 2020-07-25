import React, {useState, useEffect} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import Title from './Title';

function createData(time, amount) {
    return { time, amount };
}

function generateData(json_data, truncate){
    if(truncate !== undefined){ // Uso esto cuando el eje y es float para no tener todos los decimales
        var truncate_pot = Math.pow(10, truncate);
        for (var type1 in json_data) {
            json_data[type1] = Math.trunc(json_data[type1]*truncate_pot)/truncate_pot;
            console.log(json_data[type1]);
        }
    }
    var data = [];

    for (var type in json_data) {
        var fecha = type.split("-");
        fecha = [fecha[2],fecha[1]].join("-")
        data.push(createData(fecha,json_data[type]));
    }
    data.sort().reverse();
    return data;

}

export default function Chart(props) {
    const theme = useTheme();
    const [data, setData] = useState({});
    useEffect(() => {
        setData(generateData(props.data, props.truncate));
    }, []);

    return (
        <React.Fragment>
            <Title>{props.title}</Title>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                            angle={270}
                            position="left"
                            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                        >
                            {props.ylabel}
                        </Label>
                    </YAxis>
                    <Tooltip/>
                    {/*<Legend />*/}
                    <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={true} />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}