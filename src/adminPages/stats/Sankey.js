import React, {useState, useEffect} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Treemap, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import Title from './Title';

function createData(name, amount) {
    return { "name": name, "size": amount };
}

function generateData(json_data){
    var data = [];

    for (var type in json_data) {
        data.push(createData(type,json_data[type]));
    }
    return data;

}

export default function Sankey(props) {
    const theme = useTheme();
    const [data, setData] = useState({});
    useEffect(() => {
        setData(generateData(props.data));
    }, []);

    return (
        <React.Fragment>
            <Title>{props.title}</Title>
            <ResponsiveContainer>
                <Treemap
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                    dataKey="size"
                    ratio={10 / 3}
                    stroke="#fff"
                    fill="#8884d8"
                >
                <Tooltip />
                </Treemap>
            </ResponsiveContainer>
        </React.Fragment>
    );
}