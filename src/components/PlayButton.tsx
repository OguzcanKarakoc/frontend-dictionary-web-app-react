import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.ts";
import { useState } from "react";

interface PlaySvgProps {
    [key: string]: unknown;
}

function PlayButton(props: PlaySvgProps) {
    const [isHovered, setIsHovered] = useState(false);

    const fullConfig = resolveConfig(tailwindConfig);

    const purple = fullConfig.theme.colors["medium-purple"];
    const fill = isHovered ? fullConfig.theme.colors["white"] : purple;

    return (
        <button type="button" title="play audio" {...props}>
            <svg
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 75 75"
            >
                <g fill={purple} fillRule="evenodd">
                    <circle
                        cx="37.5"
                        cy="37.5"
                        r="37.5"
                        opacity={isHovered ? "1" : ".25"}
                    />
                    <path d="M29 27v21l21-10.5z" fill={fill} />
                </g>
            </svg>
        </button>
    );
}

export default PlayButton;
