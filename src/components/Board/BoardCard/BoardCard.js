import React, { useState, useEffect, useRef } from 'react';

const BoardCard = (elem) => {
    const [visibleActions, setVisibleActions] = useState({});
    const [visibleActionsBool, setVisibleActionsBool] = useState("");
    const actionsRef = useRef(null);

    const handleClickOutside = (event) => {
        if (actionsRef.current && !actionsRef.current.contains(event.target)) {
            setVisibleActions({}); // Hide all actions when clicking outside
        }
    };

    const toggleActions = (e, type, id) => {
        const targetId = e.currentTarget.id;
        setVisibleActionsBool((prev) => (prev === targetId ? null : targetId));
        setVisibleActions((prev) => ({
            [type]: prev[type] === id ? null : id,
        }));
    };

    const toggleCheck = (boardId, dealId, id) => {
        setVisibleActionsBool(dealId)
        elem?.setSelectedTask(boardId, dealId, id)
        document.action_container = `${id}`;
        console.log(document.action_container)
        document.getElementById("action_trigger_main").click();
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        elem?.deals?.map((deal) => (
            <a href={deal?.href} className='board_card' style={{ background: deal?.color }} key={deal?.id} id={deal?.id} draggable="true" onClick={(e) => e.preventDefault()}>
                <div className='card_info flex j-between a-center'>
                    <p className='card_date'>{deal?.name}</p>
                    {deal?.manager && (
                        <div className='card_manager' onClick={() => console.log(deal?.manager?.split(" ")?.slice(1, 3)?.map(word => word?.charAt(0))?.join(""))}>
                            {deal?.manager?.length === 0 ? "" : deal?.manager?.split(" ")?.length === 1 ? deal?.manager?.charAt(0) : deal?.manager?.split(" ")?.length === 2 ? deal?.manager?.split(" ")?.slice(0, 3)?.map(word => word?.charAt(0))?.join("") : deal?.manager?.split(" ")?.slice(1, 3)?.map(word => word?.charAt(0))?.join("")}
                        </div>
                    )}
                </div>
                {deal?.client && <p className='card_client'>{deal?.client}</p>}
                {deal?.appealType && <p className='card_appealType'>{deal?.appealType}</p>}
                {deal?.responsible && (
                    <div className='card_responsible'>
                        <p>Ответственный:</p>
                        {deal?.responsible && <span>{deal?.responsible}</span>}
                    </div>
                )}
                {deal?.appartment && <p className='card_appartment'>{deal?.appartment}</p>}
                <div className='card_details flex a-center'>
                    {deal?.cost && <p className='card_cost'>{deal?.cost}</p>}
                    {deal?.area && <p className='card_area flex a-center'>{deal?.area}<sup>2</sup></p>}
                </div>
                {deal?.more?.map((el) => (
                    <div className='card_responsible'>
                        <p>{el?.value}</p>
                        <span>{el?.label}</span>
                    </div>
                ))}
                {deal?.call_status?.name &&
                    <div className='card_call_status' id={`${deal.id}_${deal.call_status?.name}`}>
                        <p>Статус звонка:</p>
                        <div
                            style={{
                            borderRadius: "20px",
                            color: deal?.call_status?.color,
                            background: deal?.call_status?.bgColor,
                            padding: "4px 12px",
                            fontSize:"13px",
                            marginTop:"4px",
                            fontWeight: 500,
                            display: "inline-block"
                            }}
                        >
                            {deal?.call_status?.label}
                        </div>
                    </div>
                }
                <div className='card_functions flex a-center j-between'>
                    <div className='card_functions-left flex a-center'>
                        <button id={`card_task${deal?.id}`} className='card_tasks default_btn flex a-center' onClick={(e) => { toggleActions(e, 'task', deal?.id); }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M11.5 6C12.0523 6 12.5 5.55228 12.5 5C12.5 4.44772 12.0523 4 11.5 4C10.9477 4 10.5 4.44772 10.5 5C10.5 5.55228 10.9477 6 11.5 6Z" fill="#127CCA" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M19 10.5346V19.5C19 20.8807 17.8807 22 16.5 22H6.5C5.11929 22 4 20.8807 4 19.5V6.5C4 5.11929 5.11929 4 6.5 4H7.80001C8.03164 2.85888 9.04052 2 10.25 2H12.75C13.9595 2 14.9684 2.85888 15.2 4H16.5C17.2353 4 17.8965 4.31746 18.3539 4.82279C18.8262 4.42858 19.5782 4.49884 20.0796 5.00025L21.3524 6.27304C21.8796 6.80025 21.9301 7.60447 21.4653 8.06931L19 10.5346ZM13.632 4.31829L13.8921 5.6H16.5C16.792 5.6 17.0516 5.73909 17.216 5.95464L11.708 11.4626C11.5063 11.6643 11.3935 11.9415 11.3901 12.2437L11.3755 13.531C11.3668 14.3013 12.0513 14.9858 12.8216 14.9771L14.1089 14.9626C14.4111 14.9592 14.6883 14.8463 14.89 14.6446L17.4 12.1346V19.5C17.4 19.9971 16.9971 20.4 16.5 20.4H6.5C6.00294 20.4 5.6 19.9971 5.6 19.5V6.5C5.6 6.00294 6.00294 5.6 6.5 5.6H9.10786L9.36803 4.31829C9.45128 3.90816 9.81645 3.6 10.25 3.6H12.75C13.1836 3.6 13.5487 3.90816 13.632 4.31829ZM20.5668 7.05861L19.294 5.78582C19.2589 5.75067 19.2053 5.7473 19.1743 5.77829L17.9959 6.95664L19.396 8.35671L20.5743 7.17836C20.6053 7.14737 20.602 7.09376 20.5668 7.05861ZM12.599 12.3536L17.2104 7.74221L18.6104 9.14228L13.9991 13.7536C13.9856 13.7671 13.9671 13.7746 13.947 13.7748L12.6597 13.7894C12.6083 13.7899 12.5627 13.7443 12.5633 13.6929L12.5778 12.4056C12.578 12.3855 12.5856 12.367 12.599 12.3536Z" fill="#127CCA" />
                            </svg>
                            {deal?.tasks && <div className='task_count' style={{ border: deal?.task_color ? `1px solid ${deal?.task_color}` : `1px solid #757575`, background: deal?.task_color ? deal?.task_color : `#757575`, borderRadius: "4px", color: "white", position:"absolute", top:"-10%", right:"10%" }}>{deal?.tasks}</div>}
                            <div className={visibleActions.task === deal.id && visibleActionsBool !== null ? 'task_section' : 'task_section hidden'} ref={actionsRef}>
                                {deal?.task_actions?.map((task) => (
                                    <div key={task?.id} id={task?.id} className="task_detail flex a-center j-center" onClick={(e) => { console.log(e); toggleCheck(elem?.id, deal?.id, task?.id) }}>
                                        <span style={{ display: "inline-block" }} className="elem_check">
                                            {task?.checked ? (
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
                                        <div className='task_details flex column a-start j-start'>
                                            <p className='task_info' style={{ color: "#da0000" }}>{task?.name}</p>
                                            <p className='task_info' style={{ color: "#127CCA" }}>{task?.type_name_event?.replace(/\s+/g, '')?.length > 40 ? `${task.type_name_event.substring(0, 40)}...` : task?.type_name_event}</p>
                                            <p className='task_info'>С кем: <span style={{ color: "#127CCA" }}>{task?.name_client?.replace(/\s+/g, '')?.length > 30 ? `${task?.name_client.substring(0, 30)}...` : task?.name_client}</span></p>
                                        </div>
                                        <div style={{ padding: "2px 8px", borderRadius: "100px", background: deal?.task_color }}>{task?.task_num}</div>
                                        <div>{task?.type_event === "incoming_call" ? <img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNSAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yLjM0Mzg3IDIuMjQ1OTVMMi4zODMzNiAyLjIwMDgzTDIuNDE4ODUgMi4xNTI1MUMyLjQzNDA1IDIuMTMxODEgMi40NTE0OCAyLjExMTM3IDIuNDcxNDYgMi4wOTE0MkwzLjAxMzA2IDEuNTUwNjlDMy4yMTQzIDEuMzQ5NzcgMy41NDE1MiAxLjM0OTc3IDMuNzQyNzYgMS41NTA2OUw1LjkwOTE3IDMuNzEzNjJDNi4xMDkxNyAzLjkxMzI5IDYuMTA5MTcgNC4yMzYxIDUuOTA5MTcgNC40MzU3OEw1LjM2NzU3IDQuOTc2NTFMNi4zNTY3MiA1Ljk2NzI2TDUuMzY3NTcgNC45NzY1MUM0Ljg2NzY3IDUuNDc1NjEgNC42MDQ1MSA2LjQyNjgzIDUuMjA4OTcgNy4yMDgzNkM1LjUwNDc5IDcuNTkwODMgNS44Mjg1NyA3Ljk1OSA2LjE3OTk3IDguMzA5ODNDNi41MzEzNyA4LjY2MDY3IDYuOTAwMSA4Ljk4MzkgNy4yODMxNCA5LjI3OTJDOC4wNjM1IDkuODgwODIgOS4wMTI3OCA5LjYxOTYzIDkuNTEyMjggOS4xMjA5M0wxMC4wNTM5IDguNTgwMkMxMC4yNTUxIDguMzc5MjggMTAuNTgyMyA4LjM3OTI4IDEwLjc4MzYgOC41ODAyTDEyLjk1IDEwLjc0MzFDMTMuMTUgMTAuOTQyOCAxMy4xNSAxMS4yNjU2IDEyLjk1IDExLjQ2NTNMMTIuNTQ5NSAxMS44NjUxTDEyLjQ5NzEgMTEuOTE3NEwxMi40NTA1IDExLjk3NUMxMi40MTg0IDEyLjAxNDcgMTIuMzg0MiAxMi4wNTI3IDEyLjM0NzYgMTIuMDg5MkMxMS45MDIyIDEyLjUzMzkgMTAuOTg4NyAxMi44MDQ0IDkuNTIzNjcgMTIuNDEyQzguMTAwMzEgMTIuMDMwNyA2LjQzNDI5IDExLjA3MzQgNC45MzEyMSA5LjU3MjczQzMuNDY0ODkgOC4xMDg3NyAyLjUxNTYzIDYuNDg4OTYgMi4xMTYxMSA1LjA5MDE0QzEuNzA0NjQgMy42NDk0OSAxLjkzMjY0IDIuNzE1NzMgMi4zNDM4NyAyLjI0NTk1Wk02LjMxNjM5IDYuMzUxODRDNi4yMjY2NSA2LjIzNTgxIDYuMjUyOSA2LjA3MDkyIDYuMzU2NzIgNS45NjcyNkw2Ljg5ODMyIDUuNDI2NTNDNy42NDYxMiA0LjY3OTkzIDcuNjQ2MTIgMy40Njk0NiA2Ljg5ODMyIDIuNzIyODdMNC43MzE5MiAwLjU1OTk0NUMzLjk4NDEyIC0wLjE4NjY0OCAyLjc3MTcgLTAuMTg2NjQ4IDIuMDIzOSAwLjU1OTk0NUwxLjQ4MjMgMS4xMDA2OEMxLjQxMTY4IDEuMTcxMTggMS4zNDc3MyAxLjI0NTgzIDEuMjkwNDUgMS4zMjM4MkMtMC40MjE0ODYgMy4yNzk1MSAwLjczMDQ4MyA3LjM1NzA2IDMuOTQyMDYgMTAuNTYzNUM3LjIzMjM2IDEzLjg0ODUgMTEuNDM4NSAxNC45NzUyIDEzLjMzNjggMTMuMDhDMTMuNDA4NCAxMy4wMDg1IDEzLjQ3NTcgMTIuOTMzNyAxMy41Mzg3IDEyLjg1NThMMTMuOTM5MiAxMi40NTZDMTQuNjg2OSAxMS43MDk0IDE0LjY4NyAxMC40OTkgMTMuOTM5MiA5Ljc1MjM4TDExLjc3MjcgNy41ODk0NUMxMS4wMjQ5IDYuODQyODYgOS44MTI1MyA2Ljg0Mjg2IDkuMDY0NzMgNy41ODk0NUw4LjUyMzEzIDguMTMwMThDOC40MTkzIDguMjMzODQgOC4yNTQxNCA4LjI2MDA0IDguMTM3OTMgOC4xNzA0NUM3LjgwMjA3IDcuOTExNTIgNy40NzgyMyA3LjYyNzY5IDcuMTY5MTMgNy4zMTkwOUM2Ljg2MDAyIDcuMDEwNDggNi41NzU3NCA2LjY4NzE1IDYuMzE2MzkgNi4zNTE4NFpNMTMuMTM2NSA1LjI3MjMzQzEyLjc0OTkgNS4yNzIzMyAxMi40MzY1IDQuOTU4OTIgMTIuNDM2NSA0LjU3MjMzVjMuNDU4MjVMMTAuNzg1OSA1LjA3Mjc1QzEwLjUwOTUgNS4zNDMwNyAxMC4wNjYzIDUuMzM4MTcgOS43OTYwMiA1LjA2MTc5QzkuNTI1NyA0Ljc4NTQyIDkuNTMwNiA0LjM0MjIzIDkuODA2OTggNC4wNzE5TDExLjUxNjMgMi40SDEwLjJDOS44MTM0IDIuNCA5LjUgMi4wODY2IDkuNSAxLjdDOS41IDEuMzEzNCA5LjgxMzQgMSAxMC4yIDFIMTMuMTM2NkMxMy41MjMyIDEgMTMuODM2NiAxLjMxMzQgMTMuODM2NiAxLjdMMTMuODM2NSAxLjcwOTM3VjEuNzg0OTlWMS44MDM1OVY0LjU3MjMzQzEzLjgzNjUgNC45NTg5MiAxMy41MjMxIDUuMjcyMzMgMTMuMTM2NSA1LjI3MjMzWiIgZmlsbD0iIzM1QjI3OSIvPgo8L3N2Zz4K' /> : task?.type_event === "outgoing_call" ? <img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNSAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02LjMxNjM5IDYuMzUxODRDNi4yMjY2NSA2LjIzNTgxIDYuMjUyOSA2LjA3MDkyIDYuMzU2NzIgNS45NjcyNkw2Ljg5ODMyIDUuNDI2NTNDNy42NDYxMiA0LjY3OTkzIDcuNjQ2MTIgMy40Njk0NiA2Ljg5ODMyIDIuNzIyODdMNC43MzE5MiAwLjU1OTk0NUMzLjk4NDEyIC0wLjE4NjY0OCAyLjc3MTcgLTAuMTg2NjQ4IDIuMDIzOSAwLjU1OTk0NUwxLjQ4MjMgMS4xMDA2OEMxLjQxMTY4IDEuMTcxMTggMS4zNDc3MyAxLjI0NTgzIDEuMjkwNDUgMS4zMjM4MkMtMC40MjE0ODYgMy4yNzk1MSAwLjczMDQ4MyA3LjM1NzA2IDMuOTQyMDYgMTAuNTYzNUM3LjIzMjM2IDEzLjg0ODUgMTEuNDM4NSAxNC45NzUyIDEzLjMzNjggMTMuMDhDMTMuNDA4NCAxMy4wMDg1IDEzLjQ3NTcgMTIuOTMzNyAxMy41Mzg3IDEyLjg1NThMMTMuOTM5MiAxMi40NTZDMTQuNjg2OSAxMS43MDk0IDE0LjY4NyAxMC40OTkgMTMuOTM5MiA5Ljc1MjM4TDExLjc3MjcgNy41ODk0NUMxMS4wMjQ5IDYuODQyODYgOS44MTI1MyA2Ljg0Mjg2IDkuMDY0NzMgNy41ODk0NUw4LjUyMzEzIDguMTMwMThDOC40MTkzIDguMjMzODQgOC4yNTQxNCA4LjI2MDA0IDguMTM3OTMgOC4xNzA0NUM3LjgwMjA3IDcuOTExNTIgNy40NzgyMyA3LjYyNzY5IDcuMTY5MTMgNy4zMTkwOUM2Ljg2MDAyIDcuMDEwNDggNi41NzU3NCA2LjY4NzE1IDYuMzE2MzkgNi4zNTE4NFpNMi4zNDM4NyAyLjI0NTk1TDIuMzgzMzYgMi4yMDA4M0wyLjQxODg1IDIuMTUyNTFDMi40MzQwNSAyLjEzMTgxIDIuNDUxNDggMi4xMTEzNyAyLjQ3MTQ2IDIuMDkxNDJMMy4wMTMwNiAxLjU1MDY5QzMuMjE0MyAxLjM0OTc3IDMuNTQxNTIgMS4zNDk3NyAzLjc0Mjc2IDEuNTUwNjlMNS45MDkxNyAzLjcxMzYyQzYuMTA5MTcgMy45MTMyOSA2LjEwOTE3IDQuMjM2MSA1LjkwOTE3IDQuNDM1NzhMNS4zNjc1NyA0Ljk3NjUxQzQuODY3NjcgNS40NzU2MSA0LjYwNDUxIDYuNDI2ODMgNS4yMDg5NyA3LjIwODM2QzUuNTA0NzkgNy41OTA4MyA1LjgyODU3IDcuOTU5IDYuMTc5OTcgOC4zMDk4M0M2LjUzMTM3IDguNjYwNjcgNi45MDAxIDguOTgzOSA3LjI4MzE0IDkuMjc5MkM4LjA2MzUgOS44ODA4MiA5LjAxMjc4IDkuNjE5NjMgOS41MTIyOCA5LjEyMDkzTDEwLjA1MzkgOC41ODAyQzEwLjI1NTEgOC4zNzkyOCAxMC41ODIzIDguMzc5MjggMTAuNzgzNiA4LjU4MDJMMTIuOTUgMTAuNzQzMUMxMy4xNSAxMC45NDI4IDEzLjE1IDExLjI2NTYgMTIuOTUgMTEuNDY1M0wxMi40OTcxIDExLjkxNzRMMTIuNDUwNSAxMS45NzVDMTIuNDE4NCAxMi4wMTQ3IDEyLjM4NDIgMTIuMDUyNyAxMi4zNDc2IDEyLjA4OTJDMTEuOTAyMiAxMi41MzM5IDEwLjk4ODcgMTIuODA0NCA5LjUyMzY3IDEyLjQxMkM4LjEwMDMxIDEyLjAzMDcgNi40MzQyOSAxMS4wNzM0IDQuOTMxMjEgOS41NzI3M0MzLjQ2NDg5IDguMTA4NzcgMi41MTU2MyA2LjQ4ODk2IDIuMTE2MTEgNS4wOTAxNEMxLjcwNDY0IDMuNjQ5NDkgMS45MzI2NCAyLjcxNTczIDIuMzQzODcgMi4yNDU5NVoiIGZpbGw9IiNGRjUwMTAiLz4KPHBhdGggZD0iTTEwLjIwMDEgMUMxMC41ODY3IDEgMTAuOTAwMSAxLjMxMzQgMTAuOTAwMSAxLjdWMi44MTQwOEwxMi41NTA3IDEuMTk5NThDMTIuODI3MSAwLjkyOTI1MyAxMy4yNzAzIDAuOTM0MTU4IDEzLjU0MDYgMS4yMTA1M0MxMy44MTA5IDEuNDg2OTEgMTMuODA2IDEuOTMwMSAxMy41Mjk2IDIuMjAwNDJMMTEuODIwMyAzLjg3MjMzSDEzLjEzNjZDMTMuNTIzMiAzLjg3MjMzIDEzLjgzNjYgNC4xODU3MyAxMy44MzY2IDQuNTcyMzNDMTMuODM2NiA0Ljk1ODkzIDEzLjUyMzIgNS4yNzIzMyAxMy4xMzY2IDUuMjcyMzNIMTAuMkM5LjgxMzQgNS4yNzIzMyA5LjUgNC45NTg5MyA5LjUgNC41NzIzM0w5LjUwMDA2IDQuNTYyOTZWMS43QzkuNTAwMDYgMS4zMTM0IDkuODEzNDYgMSAxMC4yMDAxIDFaIiBmaWxsPSIjRkY1MDEwIi8+Cjwvc3ZnPgo=' /> : task?.type_event === "comment" ? <img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTMiIHZpZXdCb3g9IjAgMCAxNSAxMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQuMjAwMDEgMTBMNC4yMDAwMSA5LjNIMy41MDAwMUgzQzIuMDA1ODkgOS4zIDEuMiA4LjQ5NDExIDEuMiA3LjVWMi41QzEuMiAxLjUwNTg5IDIuMDA1ODkgMC43IDMgMC43SDEyQzEyLjk5NDEgMC43IDEzLjggMS41MDU4OSAxMy44IDIuNVY3LjVDMTMuOCA4LjQ5NDExIDEyLjk5NDEgOS4zIDEyIDkuM0g3LjdINy40NzU2OEw3LjI5MzE0IDkuNDMwMzlMNC42NzQzOCAxMS4zMDA5QzQuNDc1ODIgMTEuNDQyOCA0LjIwMDAxIDExLjMwMDggNC4yMDAwMSAxMS4wNTY4TDQuMjAwMDEgMTBaIiBzdHJva2U9IiM0MUE1RUUiIHN0cm9rZS13aWR0aD0iMS40Ii8+Cjwvc3ZnPgo=' /> : task?.type_event === "info" ? <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA7klEQVR4nJXSTy6EQRAF8N9sbJkwFiwRV5jZECGx8GeOQCJxF+YCmJkLOKEdedLfpDP6I96muqr7dVW9KtoY4Rr3xcb/E8dY4gk3GOMWz1jgqI94gVds9txv4Q3nrYwhDqrYPl6wV8UGmOOwJi8bGU/xgZNGBfPO2S09trDRE59hR1Ez4qzjAe8YNu6muMrhDpPGg/T6udZzh0nh9Wb+jTztMo/KHP9DnmG7cxZFxRrjQo6tMSzzXiGbk0A950s8Ftuhm/PBeinZnHywXkGdMcSznvvvzcmD9BRRomps/Hz8I2MLWYComXHErsSp8QXDfiHn5joUnwAAAABJRU5ErkJggg==' /> : task?.type_event === "meeting" ? <img alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNy45MzQ4IDMuNTUxNDZDMTcuOTM0OCA1LjUxMjg4IDE2LjM2NzggNy4xMDI5MyAxNC40MzQ4IDcuMTAyOTNDMTIuNTAxOCA3LjEwMjkzIDEwLjkzNDggNS41MTI4OCAxMC45MzQ4IDMuNTUxNDZDMTAuOTM0OCAxLjU5MDA0IDEyLjUwMTggMCAxNC40MzQ4IDBDMTYuMzY3OCAwIDE3LjkzNDggMS41OTAwNCAxNy45MzQ4IDMuNTUxNDZaTTE2LjMzNDggMy41NTE0NkMxNi4zMzQ4IDQuNjUxMzMgMTUuNDYyMiA1LjUwMjkzIDE0LjQzNDggNS41MDI5M0MxMy40MDc0IDUuNTAyOTMgMTIuNTM0OCA0LjY1MTMzIDEyLjUzNDggMy41NTE0NkMxMi41MzQ4IDIuNDUxNiAxMy40MDc0IDEuNiAxNC40MzQ4IDEuNkMxNS40NjIyIDEuNiAxNi4zMzQ4IDIuNDUxNiAxNi4zMzQ4IDMuNTUxNDZaIiBmaWxsPSIjRkZDMjEwIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTAuMTA4NyA1LjMxNjE3QzEwLjEwODcgNy4yNzc1OSA4LjU0MTcgOC44Njc2MyA2LjYwODcgOC44Njc2M0M0LjY3NTcxIDguODY3NjMgMy4xMDg3IDcuMjc3NTkgMy4xMDg3IDUuMzE2MTdDMy4xMDg3IDMuMzU0NzUgNC42NzU3MSAxLjc2NDcxIDYuNjA4NyAxLjc2NDcxQzguNTQxNyAxLjc2NDcxIDEwLjEwODcgMy4zNTQ3NSAxMC4xMDg3IDUuMzE2MTdaTTguNTA4NyA1LjMxNjE3QzguNTA4NyA2LjQxNjAzIDcuNjM2MTEgNy4yNjc2MyA2LjYwODcgNy4yNjc2M0M1LjU4MTMgNy4yNjc2MyA0LjcwODcgNi40MTYwMyA0LjcwODcgNS4zMTYxN0M0LjcwODcgNC4yMTYzMSA1LjU4MTMgMy4zNjQ3MSA2LjYwODcgMy4zNjQ3MUM3LjYzNjExIDMuMzY0NzEgOC41MDg3IDQuMjE2MzEgOC41MDg3IDUuMzE2MTdaIiBmaWxsPSIjRkZDMjEwIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNC4wMjk0MSA5LjcwNTg4QzIuMDgwMTcgOS43MDU4OCAwLjUgMTEuMjg2MSAwLjUgMTMuMjM1M0MwLjUgMTQuMjA5OSAxLjI5MDA4IDE1IDIuMjY0NyAxNUgxMC45MDkyQzExLjg4MzkgMTUgMTIuNjczOSAxNC4yMDk5IDEyLjY3MzkgMTMuMjM1M0MxMi42NzM5IDExLjI4NjEgMTEuMDkzOCA5LjcwNTg4IDkuMTQ0NTMgOS43MDU4OEg0LjAyOTQxWk05LjE0NDUzIDExLjMwNTlINC4wMjk0MUMyLjk2MzgzIDExLjMwNTkgMi4xIDEyLjE2OTcgMi4xIDEzLjIzNTNDMi4xIDEzLjMyNjMgMi4xNzM3NCAxMy40IDIuMjY0NyAxMy40SDEwLjkwOTJDMTEuMDAwMiAxMy40IDExLjA3MzkgMTMuMzI2MyAxMS4wNzM5IDEzLjIzNTNDMTEuMDczOSAxMi4xNjk3IDEwLjIxMDEgMTEuMzA1OSA5LjE0NDUzIDExLjMwNTlaIiBmaWxsPSIjRkZDMjEwIi8+CjxwYXRoIGQ9Ik0xMy40NzQgOS41NDExOEMxMy4wMzIyIDkuNTQxMTggMTIuNjc0IDkuMTgzMDEgMTIuNjc0IDguNzQxMThDMTIuNjc0IDguMjk5MzUgMTMuMDMyMiA3Ljk0MTE4IDEzLjQ3NCA3Ljk0MTE4SDE2Ljk3MDZDMTguOTE5OSA3Ljk0MTE4IDIwLjUgOS41MjEzNSAyMC41IDExLjQ3MDZDMjAuNSAxMi40NDUyIDE5LjcxIDEzLjIzNTMgMTguNzM1MyAxMy4yMzUzSDE0LjM0MzVDMTMuOTAxNyAxMy4yMzUzIDEzLjU0MzUgMTIuODc3MSAxMy41NDM1IDEyLjQzNTNDMTMuNTQzNSAxMS45OTM1IDEzLjkwMTcgMTEuNjM1MyAxNC4zNDM1IDExLjYzNTNIMTguNzM1M0MxOC44MjYzIDExLjYzNTMgMTguOSAxMS41NjE2IDE4LjkgMTEuNDcwNkMxOC45IDEwLjQwNSAxOC4wMzYyIDkuNTQxMTggMTYuOTcwNiA5LjU0MTE4SDEzLjQ3NFoiIGZpbGw9IiNGRkMyMTAiLz4KPC9zdmc+Cg=="/> : task?.type_event === "calendar" ? <img src="data:image/png;base64,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" alt=""/> : null}</div>
                                    </div>
                                ))}
                            </div>
                        </button>
                        <button
                            id={`card_add${deal?.id}`}
                            className={`${deal?.add_actions?.length < 1 ? `unavailable default_btn flex a-center j-center` : `default_btn flex a-center j-center`}`}
                            onClick={(e) => { toggleActions(e, 'add', deal?.id); }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <rect x="3.8" y="3.8" width="16.4" height="16.4" rx="1.7" stroke="#127CCA" strokeWidth="1.6" />
                                <path d="M12.7987 7.8C12.7987 7.35817 12.4406 7 11.9987 7C11.5569 7 11.1987 7.35817 11.1987 7.8V11.2009L7.79997 11.201C7.35814 11.201 6.99998 11.5592 7 12.0011C7.00002 12.4429 7.3582 12.801 7.80003 12.801L11.1987 12.8009V16.2021C11.1987 16.6439 11.5569 17.0021 11.9987 17.0021C12.4406 17.0021 12.7987 16.6439 12.7987 16.2021V12.8009L16.1974 12.8008C16.6392 12.8008 16.9974 12.4426 16.9973 12.0008C16.9973 11.559 16.6391 11.2008 16.1973 11.2008L12.7987 11.2009V7.8Z" fill="#127CCA" />
                            </svg>
                        </button>
                        <div className={visibleActions.add === deal.id && visibleActionsBool !== null ? 'actions' : 'actions hidden'} >
                            {deal?.add_actions?.map((action) => (
                                <button key={action.value} id={action.value} className="default_btn" onClick={(e) => toggleActions(e, 'add')}>{action.label}</button>
                            ))}
                        </div>
                    </div>
                    <div className='card_function-right flex a-center'>
                        <button
                            id={`card_call${deal?.id}`}
                            className={`${deal?.call_actions?.length < 1 ? `unavailable default_btn flex a-center j-center` : `default_btn flex a-center j-center`}`}
                            onClick={(e) => { toggleActions(e, 'call', deal?.id); }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M4.61825 5.22899L4.64081 5.20321L4.66109 5.17559C4.71069 5.10805 4.76633 5.04306 4.82819 4.9813L5.52454 4.28607C6.17367 3.63798 7.22667 3.63798 7.8758 4.28607L10.6612 7.06697C11.3096 7.71436 11.3096 8.76344 10.6612 9.41082L9.96484 10.106C9.60502 10.4653 9.4359 11.1266 9.84541 11.6561C10.1997 12.1142 10.5878 12.5555 11.0094 12.9764C11.4309 13.3973 11.873 13.7847 12.3317 14.1384C12.8607 14.5462 13.5211 14.3782 13.8807 14.0192L14.577 13.324C15.2262 12.6759 16.2792 12.6759 16.9283 13.324L19.7137 16.1049C20.3621 16.7523 20.3621 17.8014 19.7137 18.4488L19.1988 18.9628L19.1689 18.9927L19.1422 19.0256C19.0789 19.1039 19.0112 19.179 18.9392 19.2509C18.0067 20.1819 16.3946 20.4737 14.3431 19.9242C12.3154 19.3811 10.0247 18.0462 7.99073 16.0155C6.00585 14.0338 4.68421 11.8075 4.1163 9.8191C3.54157 7.80684 3.77185 6.19589 4.61825 5.22899Z" stroke="#127CCA" strokeWidth="1.6" />
                            </svg>
                        </button>
                        <div className={visibleActions.call === deal.id && visibleActionsBool !== null ? 'actions' : 'actions hidden'} ref={actionsRef}>
                            {deal?.call_actions?.map((action) => (
                                <button key={action.value} id={action.value} onClick={(e) => toggleActions(e, 'call')} className="default_btn">{action.label}</button>
                            ))}
                        </div>
                        <button
                            id={`card_message${deal?.id}`}
                            className={`${deal?.mail_actions?.length < 1 ? `unavailable default_btn flex a-center j-center` : `default_btn flex a-center j-center`}`}
                            onClick={(e) => { toggleActions(e, 'message', deal?.id) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M2.15962 5.61908C2.37273 4.97601 2.85911 4.41487 3.60527 4.14354C3.86641 4.04858 4.14215 4 4.42002 4H19.58C19.8579 4 20.1336 4.04858 20.3947 4.14354C21.1409 4.41487 21.6273 4.97601 21.8404 5.61909C21.9436 5.89307 22 6.18994 22 6.5V17.5C22 18.8807 20.8807 20 19.5 20H4.5C3.11929 20 2 18.8807 2 17.5V6.5C2 6.18994 2.05645 5.89306 2.15962 5.61908ZM3.67218 6.14627C3.80961 5.82506 4.12852 5.6 4.5 5.6H19.5C19.8715 5.6 20.1904 5.82507 20.3278 6.14628C20.4333 6.48512 20.3103 6.88864 19.9409 7.08018L12.4143 10.9829C12.1545 11.1176 11.8455 11.1176 11.5857 10.9829L4.05909 7.08019C3.68967 6.88865 3.56669 6.48512 3.67218 6.14627ZM20.4 8.64444V17.5C20.4 17.9971 19.9971 18.4 19.5 18.4H4.5C4.00294 18.4 3.6 17.9971 3.6 17.5V8.64445L10.8492 12.4033C11.5708 12.7774 12.4292 12.7774 13.1508 12.4033L20.4 8.64444Z" fill="#127CCA" />
                            </svg>
                        </button>
                        <div className={visibleActions.message === deal.id && visibleActionsBool !== null ? 'actions' : 'actions hidden'} ref={actionsRef}>
                            {deal?.mail_actions?.map((action) => (
                                <button key={action.value} id={action.value} onClick={(e) => toggleActions(e, 'message')} className="default_btn">{action.label}</button>
                            ))}
                        </div>
                        <button
                            id={`card_social_${deal?.id}`}
                            className={`${deal?.messenger_actions?.length < 1 ? `unavailable default_btn flex a-center j-center` : `default_btn flex a-center j-center`}`}
                            onClick={(e) => { toggleActions(e, 'social', deal?.id) }}>
                            <img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTMiIHZpZXdCb3g9IjAgMCAxNSAxMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQuMjAwMDEgMTBMNC4yMDAwMSA5LjNIMy41MDAwMUgzQzIuMDA1ODkgOS4zIDEuMiA4LjQ5NDExIDEuMiA3LjVWMi41QzEuMiAxLjUwNTg5IDIuMDA1ODkgMC43IDMgMC43SDEyQzEyLjk5NDEgMC43IDEzLjggMS41MDU4OSAxMy44IDIuNVY3LjVDMTMuOCA4LjQ5NDExIDEyLjk5NDEgOS4zIDEyIDkuM0g3LjdINy40NzU2OEw3LjI5MzE0IDkuNDMwMzlMNC42NzQzOCAxMS4zMDA5QzQuNDc1ODIgMTEuNDQyOCA0LjIwMDAxIDExLjMwMDggNC4yMDAwMSAxMS4wNTY4TDQuMjAwMDEgMTBaIiBzdHJva2U9IiMxMjdDQ0EiIHN0cm9rZS13aWR0aD0iMS40Ii8+Cjwvc3ZnPgo=' />
                        </button>
                        <div className={visibleActions.social === deal.id && visibleActionsBool !== null ? 'actions' : 'actions hidden'} ref={actionsRef}>
                            {deal?.messenger_actions?.map((action) => (
                                <button key={action.value} id={action.value} onClick={(e) => toggleActions(e, 'social')} className="default_btn">{action.label}</button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='board_line' style={{ background: deal.border }}></div>
                <a className='board_cover' href={deal.href} id={deal?.id} onDragStart={() => elem.setDragEnter(deal)} onClick={(e) => e.preventDefault()}><span style={{ opacity: 0, visibility: "hidden" }}>{deal.name}</span></a>
            </a>
        ))
    );
};

export default BoardCard;

