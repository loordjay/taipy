/*
 * Copyright 2022 Avaiga Private Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import React, { useMemo } from "react";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import { formatWSValue } from "../../utils";
import { useClassNames, useDynamicProperty, useFormatConfig } from "../../utils/hooks";
import { TaipyBaseProps, TaipyHoverProps } from "./utils";

interface TaipyFieldProps extends TaipyBaseProps, TaipyHoverProps {
    dataType?: string;
    value: string | number;
    defaultValue?: string;
    format?: string;
    raw?: boolean;
}

const Field = (props: TaipyFieldProps) => {
    const { id, dataType, format, defaultValue, raw } = props;
    const formatConfig = useFormatConfig();

    const className = useClassNames(props.libClassName, props.dynamicClassName, props.className);
    const hover = useDynamicProperty(props.hoverText, props.defaultHoverText, undefined);

    const value = useMemo(() => {
        return formatWSValue(
            props.value !== undefined ? props.value : defaultValue || "",
            dataType,
            format,
            formatConfig
        );
    }, [defaultValue, props.value, dataType, format, formatConfig]);

    return (
        <Tooltip title={hover || ""}>
            {raw ? (
                <span className={className} id={id}>
                    {value}
                </span>
            ) : (
                <Typography className={className} id={id} component="span">
                    {value}
                </Typography>
            )}
        </Tooltip>
    );
};

export default Field;
