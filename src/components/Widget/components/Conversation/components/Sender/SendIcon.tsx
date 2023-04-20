interface props {
	buttonAlt: string;
	className?: string;
	fill?: string;
}
export default function SendIcon({buttonAlt, className, fill = "#cbcbcb"}: props) {
return (
	
<svg className={className} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 535.5 535.5" xmlSpace="preserve">
<desc>{buttonAlt}</desc>
<g>
	<g id="send">
		<polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75   " fill={fill}/>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
)
}