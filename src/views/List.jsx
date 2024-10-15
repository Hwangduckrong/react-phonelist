import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const List = () => {

    // 상태 관리 변수(값이 변하면 화면에 랜더링)
    const [personList, setPersonList] = useState([]);

    // 일반 메소드: 서버에서 데이터 가져오기
    const getPersonList = () => {
        
        axios({
            method: 'get', // put, post, delete                   
            url: `${process.env.REACT_APP_API_URL}/api/persons`,
            responseType: 'json' // 수신 타입
        }).then(response => {
            console.log(response.data); // 수신 데이터
            setPersonList(response.data.apiData);
        }).catch(error => {
            console.log(error);
        });
    };

    // 마운트 되었을 때 실행되는 useEffect
    useEffect(() => {
        console.log("마운트 됐어요");
        
        //서버에 리스트 데이터를 그리는 메소드 실행
        getPersonList();
    }, []); // 빈 배열을 넣으면 마운트 시 한 번만 실행
   
   
    return (
        <>
            <h1>전화번호부</h1>
            <h2>전화번호-리스트</h2>
            <p>등록된 전화번호 리스트입니다</p>

            {/* personList가 있을 경우에만 map을 실행 */}
            {personList.map((personVo) => (
                <div key={personVo.personId}>
                    <table border="1">
                        <tbody>
                            <tr>
                                <th>이름(name)</th>
                                <td>{personVo.name}</td>
                            </tr>
                            <tr>
                                <th>핸드폰(hp)</th>
                                <td>{personVo.hp}</td>
                            </tr>
                            <tr>
                                <th>회사(company)</th>
                                <td>{personVo.company}</td>
                            </tr>
                            <tr>
                                <td>
                                    <Link to={'/editform/'+personVo.personId} target="_blank" rel="noreferrer noopener">수정</Link>
                                </td>
                                <td><button type='button'>삭제</button></td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                </div>
            ))}

            <Link to="/writeform" target="_blank" rel="noreferrer noopener">등록폼으로 이동</Link>
        </>
    );
}

export default List;