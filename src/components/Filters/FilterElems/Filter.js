import React, { useState, useRef, useEffect } from 'react';

const Filter = ({ id, title, selectedLabel, options, isOpen, setOpenFilter, multiple, search, loader }) => {
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

  const clearFilter = (e) => {
    document.action_container = `{"filter_${id}": ""}`;
    document.getElementById("action_trigger_main").click();
    setLabels([]);
    setValues([]);
    return (document.action_container)
  };

  const handleApply = () => {
    document.action_container = `{"filter_${id}": ${JSON.stringify(values)}}`;
    console.log(document.action_container);
    document.getElementById("action_trigger_main").click();
    setOpenFilter(null);
    setTrueVal(false); // Reset after applying
  };

  const handleSearch = (searchValue) => {
    document.action_container = `{"search_${id}": "${searchValue}"}`;
    console.log(document.action_container);
    document.getElementById("action_trigger_main").click();
  };

  const clearSearch = (searchValue) => {
    document.action_container = `{"search_${id}": ""}`;
    console.log(document.action_container);
    document.getElementById("action_trigger_main").click();
  };

  useEffect(() => {
    trueVal && handleApply();
  }, [labels, values]);

  // Sort options so that the selected item is first (only for single select)
  const sortedOptions = multiple 
    ? options // If multiple, do not change the order
    : options?.sort((a, b) => {
        if (values?.includes(a.value)) return -1;
        if (values?.includes(b.value)) return 1;
        return 0;
      });

  return (
    <div className="filter-container" ref={containerRef}>
      <div className="type_btn filter_btn" onClick={() => setTrueVal(true)}>
        <p
          className={values?.length ? 'selected_type bg-gray flex a-center' : 'type_btn flex a-center'}
          id={id}
        >
          {values?.length ? (
            <div style={{ padding: "10px 0 10px 12px" }} onClick={toggleDropdown}>
              {title}: {
              multiple ? values?.length > 1 ? values?.length : labels[0]?.length > 12 ? `${labels[0].slice(0, 12)}...` : labels[0] 
              : labels?.length > 15 
                ? `${labels.slice(0, 15)}...` 
                : `${labels[0].slice(0, 15)}...`}
            </div>
          ) : (
            <div style={{ padding: "12px 16px" }} className="flex a-center" onClick={toggleDropdown}>
              {title}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M7.28117 10.7264C7.69465 11.0848 8.30877 11.0848 8.72226 10.7264L12.7583 7.22746C13.0504 6.97422 13.0819 6.53213 12.8287 6.24002C12.5754 5.94791 12.1333 5.91639 11.8412 6.16963L8.00171 9.49819L4.1622 6.16963C3.87009 5.91639 3.428 5.94791 3.17476 6.24002C2.92152 6.53213 2.95303 6.97422 3.24514 7.22746L7.28117 10.7264Z"
                  fill="#1B272F"
                />
              </svg>
            </div>
          )}
          {values?.length ? (
            <button
              onClick={(e) => { clearAll(e); setTrueVal(false); setSearchFill('');clearSearch(e.target.id)}}
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
            <form className="types_search flex">
              <input
                type="text"
                id={`search_${title}`}
                value={searchFill}
                placeholder={`Начните вводить ${title?.toLowerCase()}`}
                onInput={(e) => {
                  const newValue = e.target.value;
                  setSearchFill(newValue);
                  handleSearch(newValue); // Pass the latest value to handleSearch
                }}
              />
              <button id={`search_clear_${id}`} className="clear_filter" onClick={(e) => {e?.preventDefault();console.log(e.target.id);setSearchFill('');clearSearch(e.target.id)}}>X</button>
            </form>
          )}
          <div className="filter_types" onScroll={(e) => handleFilterScroll(e, title)}>
            {sortedOptions?.map((option) => (
              <button
                className={`type w-100 flex a-center j-between ${!multiple && values?.includes(option.value) ? 'selected' : ''}`}
                id={option?.value}
                key={option?.value}
                onClick={(e) => { handleOptionClick(option); !multiple && setTrueVal(true); }}
                style={{ backgroundColor: !multiple && values?.includes(option.value) ? '#D9EDFC' : '' }}
              >
                <div className='flex column a-start'>
                  <p style={{width: "248px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{option?.label}</p>
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
            {loader && 
              <div className='loader'>
                <div className="loader-spinner" style={{position: "relative", left: "40%"}}>
                </div>
              </div>
            }
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