const HeartLoader = ({isLoading}) => {
  if (!isLoading) return <></>
  return (
    <div
      className="modal loaderbg"
      id="mainImageLoaderModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{ display: isLoading }}
    >
      <div className="modal-dialog review-image-loader" role="document">
        <div className="loadingio-spinner-heart-btbrqan8295">
          <div className="ldio-kv0ui0pfesk">
            <div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeartLoader;