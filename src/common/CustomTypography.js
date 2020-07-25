import  React from 'react';
import Typography from "@material-ui/core/Typography";

const CustomTypography = props => (
    <div>
        <Typography variant="overline">
            {props.overlineText ? props.overlineText : ""}
        </Typography>
        <Typography variant="caption">
            {props.captionText ? props.captionText: ""}
        </Typography>
    </div>

)

export default CustomTypography;