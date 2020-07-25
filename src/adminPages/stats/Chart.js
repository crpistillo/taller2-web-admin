import React, {useState, useEffect} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import Title from './Title';

function createData(time, amount) {
    return { time, amount };
}

function generateData(json_data){
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
        setData(generateData(props.data));
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
                    {/*<CartesianGrid strokeDasharray="3 3" />*/}
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