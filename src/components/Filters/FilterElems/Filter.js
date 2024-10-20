import React, { useState, useRef, useEffect } from 'react';

const Filter = ({ id, title, selectedLabel, options, isOpen, setOpenFilter, multiple, search }) => {
  const [labels, setLabels] = useState();
  const [values, setValues] = useState();
  const [trueVal, setTrueVal] = useState(false);
  const [searchFill, setSearchFill] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    setLabels(selectedLabel?.map(obj => obj.label) || []);
    setValues(selectedLabel?.map(obj => obj.value) || []);
  }, [])

  const handleOptionClick = (option) => {
    if (multiple) {
      const optionLabel = option.label;
      const optionValue = option.value;
      setLabels((prevLabels) => {
        if (prevLabels.includes(optionLabel)) {
          return prevLabels.filter(label => label !== optionLabel);
        } else {
          return [...prevLabels, optionLabel];
        }
      });
      setValues((prevValue) => {
        if (prevValue?.includes(optionValue)) {
          return prevValue?.filter(value => value !== optionValue);
        } else {
          return [...prevValue, optionValue];
        }
      });
    } else {
      // Single selection
      setLabels([option.label]);
      setValues([option.value]);
      console.log(values, "single select values");
      setTrueVal(true); // Set trueVal to true to enable Apply button for single select
    }
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setOpenFilter(isOpen ? false : id);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleFilterScroll = (e, title) => {
    const target = e.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      document.getElementById("scrollAction_filter").id = `scrollAction_filter_${title}`;
      console.log(title)
      document.getElementById(`scrollAction_filter_${title}`).click(e);
      document.getElementById(`scrollAction_filter_${title}`).id = `scrollAction_filter`;
    }
  };

  const clearAll = (e) => {
    e.preventDefault();
    document.action_container = `{"filter_${id}": "clear"}`;
    document.getElementById("action_trigger_main").click();
    setLabels([]);
    setValues([]);
  };

  const handleApply = () => {
    document.action_container = `{"filter_${id}": ${JSON.stringify(values)}}`;
    console.log(document.action_container);
    document.getElementById("action_trigger_main").click();
    setOpenFilter(null);
    setTrueVal(false); // Reset after applying
  };

  const handleSearch = () => {
    document.action_container = `{"search_${id}": "${searchFill}"}`;
    console.log(document.action_container);
    document.getElementById("action_trigger_main").click();
  };

  useEffect(() => {
    trueVal && handleApply();
  }, [labels, values]);

  return (
    <div className="filter-container" ref={containerRef}>
      <div className="type_btn" onClick={() => setTrueVal(true)}>
        <p
          className={labels?.length ? 'selected_type bg-gray flex a-center' : 'type_btn flex a-center'}
          id={id}
          onClick={toggleDropdown}
        >
          {labels?.length ? (
            <div style={{ padding: "12px 0 12px 16px" }}>
              {title}: {multiple ? labels?.length > 1 ? labels?.length : labels[0] : labels}
            </div>
          ) : (
            <div style={{ padding: "12px 16px" }} className="flex a-center">
              {title}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M7.28117 10.7264C7.69465 11.0848 8.30877 11.0848 8.72226 10.7264L12.7583 7.22746C13.0504 6.97422 13.0819 6.53213 12.8287 6.24002C12.5754 5.94791 12.1333 5.91639 11.8412 6.16963L8.00171 9.49819L4.1622 6.16963C3.87009 5.91639 3.428 5.94791 3.17476 6.24002C2.92152 6.53213 2.95303 6.97422 3.24514 7.22746L7.28117 10.7264Z"
                  fill="#1B272F"
                />
              </svg>
            </div>
          )}
          {labels?.length ? (
            <button
              onClick={(e) => { clearAll(e); setTrueVal(false); }}
              style={{ cursor: "pointer", paddingRight: "12px" }}
              className="default_btn"
              id={`delete_${title}`}
            >
              X
            </button>
          ) : null}
        </p>
        <div className={`types${isOpen ? '' : ' hidden'}`} onClick={stopPropagation}>
          {search && (
            <form className="types_search flex a-center">
              <input
                type="text"
                id={`search_${title}`}
                placeholder={`Начните вводить ${title?.toLowerCase()}`}
                onChange={(e) => setSearchFill(e.target.value)}
              />
              <button
                id={`search_${id}`}
                style={{ padding: "0 6px" }}
                onClick={(e) => { e.preventDefault(); handleSearch(); }}
              >
                <svg
                  style={{ color: "white", fontSize: "12px", margin: 0, padding: "12px 6px", width: "12px", height: "12px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                  height="800px"
                  width="800px"
                  version="1.1"
                  id="Capa_1"
                  viewBox="0 0 488.4 488.4"
                >
                  <g>
                    <g>
                      <path
                        style={{ fill: "white" }}
                        d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6    s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2    S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7    S381.9,104.65,381.9,203.25z"
                      />
                    </g>
                  </g>
                </svg>
              </button>
            </form>
          )}
          <div className="filter_types" onScroll={(e) => handleFilterScroll(e, title)}>
            {options?.map((option) => (
              <button
                className="type w-100 flex a-center j-between"
                id={option?.value}
                key={option?.value}
                onClick={(e) => { handleOptionClick(option); !multiple && setTrueVal(true); }}
              >
                <div className='flex column a-start'>
                  <p>{option?.label}</p>
                  <span className='label2'>{option?.label2}</span>
                </div>
                {multiple && (
                  <span style={{ display: "inline-block" }} className="elem_check">
                    {values?.includes(option?.value) ? (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.10294 12.2746C7.26065 12.4323 7.46782 12.5104 7.67452 12.5089C7.88104 12.5177 8.09086 12.4388 8.25123 12.2746L14.6029 5.92292C14.8944 5.63143 14.8944 5.15726 14.6029 4.86577C14.3114 4.57428 13.8372 4.57428 13.5457 4.86577L7.67606 10.7355L4.47401 7.53349C4.18253 7.242 3.70835 7.242 3.41687 7.53349C3.12539 7.82497 3.12539 8.29915 3.41687 8.59064L7.10294 12.2746Z"
                          fill="#127CCA"
                        />
                      </svg>
                    ) : (
                      <span className="type_empty"></span>
                    )}
                  </span>
                )}
              </button>
            ))}
          </div>
          {multiple && (
            <div className="flex j-between w-100 types_actions">
              <button
                className="types_apply types_submit w-50"
                style={{marginLeft: "16px", marginTop: "8px"}}
                onClick={handleApply}
              >
                Применить
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
