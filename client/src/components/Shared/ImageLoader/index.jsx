import { useState } from "react";

const ImageLoader = (props) => {
  const [isLoading, setLoading] = useState(true);
  const {style, className, src, ...rest} = props;
  let imgStyle = {...style};
  if (isLoading) {
    imgStyle = {
      ...imgStyle,
      display: "none",
    }
  }
  return (
    <>
      {isLoading && <img
          src={"../assets/images/Rolling.svg"}
          style={style}
          className={className}
          alt=''
        />
      }
      <img
        src={src}
        className={className}
        style={imgStyle}
        onLoad={() => {setLoading(false)}}
        // {...rest}
        alt=''
      />
      {(props?.shadow && isLoading === false) && <div className="album-item-shadow"></div>}
    </>
  );
}

export default ImageLoader;
