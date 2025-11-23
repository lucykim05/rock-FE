<img src="https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/rock_logo.png"/>

우아한 테크 코스 4주차 &amp; 5주차 오픈 미션

## 목차

1. [**프로젝트 개요**](#1)
2. [**팀원 구성**](#2)
3. [**기술 스택**](#3)
4. [**프로젝트 문서**](#4)
5. [**주요 기능**](#5)
6. [**플로우 차트**](#6)

<br />


<div id='1'></div>

## 🎯 프로젝트 개요

| 항목 | 내용 |
| --- | --- |
| 프로젝트명 | 스터디 헬퍼 봇 & 웹 대시보드 |
| 기간 | 2025.11.4 ~ 2025.11.25 |
| 담당 | 김희주, 이여빈 |
| 목적 | DiscordJS 기반 스터디 헬퍼 봇을 개발하여 서버별 맞춤 기능과 출석/공부 시간 기록 기능을 제공하며, <br /> 사용자 개인의 데이터 확인용 웹 대시보드 구축 및 배포 |



<br />

## 📌 주제 선정 이유

처음 오픈 미션에 들어가며 잡았던 목표는 프론트엔드의 가장 중요한 언어인 Javascript를 이용해 색다른 경험을 해보고자 하는 생각을 가지고 있었습니다. 이에 다양한 고민들을 하다 문뜩 생각난 내용은 1~3주차 미션을 진행하며 디스코드 음성채널을 이용하여 모각코(모두 각자 코딩)을 진행했었는데 이 때 공부 시간을 측정할 수 있는 기능이 있으면 좋겠다는 생각이었습니다. 디스코드 봇을 프로그래밍할 때 주로 사용하는 언어는 javascript과 python이 있었고, 목표였던 javascript의 색다른 경험에 어울리는 프로젝트가 될 것 같다는 생각이 들었습니다.<br />
처음 생각한 기능은 공부시간측정이었기에 함께 테스트를 해보며 공부도 같이 진행할 동료가 있으면 더욱 좋을 것 같다는 생각이 들었습니다. 또한 3주 동안 미션을 진행하며 코드 리뷰에서 많은 영향을 받았고, 실제로 리뷰를 통해 얻은 인사이트가 많았기에 프로젝트를 진행하며 서로에게 코드 리뷰를 원활하게 진행하면 성장에 더욱 도움이 되고, 다른 사람의 코드를 이해할 수 있는 능력 또한 향상시킬 수 있을 것이라는 생각이 들었습니다.<br />
<br />
이에 코드 리뷰를 많이 주고 받았으며, 모각코에서 함께 작업을 한 경험이 있는 김희주, 이여빈 이렇게 두 사람이 함께 프로젝트를 진행하게 되었습니다.

<br />

## 📗 프로그램 실행 방법

### 기초 패키지 설정

1. 로컬에 `clone repository` 진행
2. 각 폴더(rock-FE, dashboard) 진입
3. 터미널에 `npm install`입력하여 라이브러리 각각 적용
4. `.env` 설정 후 실행 (필요 시 관리자에게 문의)

<br />

<div id='2'></div>

## 🧑‍🤝‍🧑 팀원 구성

<div align = 'center'>
    <table>
        <tr>
            <td align = 'center' width = '300'>
                <a href = 'https://github.com/stellalee1210'>
                    <img src = 'https://avatars.githubusercontent.com/u/133227322?v=4' width = '200' />
                    <br />
                    <b>이여빈</b>
                </a>
            </td>
            <td align = 'center' width = '300'>
                <a href = 'https://github.com/lucykim05'>
                    <img src ="https://avatars.githubusercontent.com/u/185035513?v=4" width = '200' />
                    <br />
                    <b>김희주</b>
                </a>
            </td>
        </tr>
        <tr>
            <td align = 'center' valign = 'top'>
                - 디스코드 봇 생성<br />
                - 프로젝트 초기 세팅<br />
                - 공부 시간 기록 및 부가 명령어 구현<br />
                - 로고 & 봇 디자인<br />
                - 사용자 인증 및 데이터 연동 구현
            </td>
            <td align = 'center' valign = 'top'>
                - DB 설계 및 구축<br />
                - 리드미, 노션 문서화 세팅<br />
                - 출석 및 봇 세팅 기능 구현<br />
                - UI 컴포넌트 구현 및 웹 레이아웃 구축<br />
                - 배포
            </td>
        </tr>
    </table>
</div>

<br />

<div id='3'></div>

## 🛠️ 기술 스택

### 개발 환경

![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?logo=visualstudiocode&logoColor=fff&style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=fff&style=for-the-badge)

### 라이브러리

![discord.js](https://img.shields.io/badge/discord.js-5865F2?logo=discord&logoColor=fff&style=for-the-badge)
![node-schedule](https://img.shields.io/badge/node--schedule-FF4136?logo=node.js&logoColor=fff&style=for-the-badge)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=for-the-badge)
![ReactDOM](https://img.shields.io/badge/ReactDOM-61DAFB?logo=react&logoColor=000&style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff&style=for-the-badge)
![React Calendar](https://img.shields.io/badge/React%20Calendar-FF6F61?logo=react&logoColor=fff&style=for-the-badge)

### 데이터베이스

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=fff&style=for-the-badge)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=000&style=for-the-badge)

### 배포 & 협업

![Koyeb](https://img.shields.io/badge/Koyeb-6E56E0?logo=koyeb&logoColor=fff&style=for-the-badge)
![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=fff&style=for-the-badge)
![Notion](https://img.shields.io/badge/Notion-3B3B3B?logo=notion&logoColor=fff&style=for-the-badge)

<br />

<div id='4'></div>

## 📑 프로젝트 문서

<table>
    <tr>
        <td align = 'center' width = '200'>
            <a href = 'https://github.com/woowa-discord/rock-FE' target = 'blank'>
                <img src = "https://img.icons8.com/ios11/512/FFFFFF/github.png" width = '80' height = '80' alt = 'repo'/>
            </a>
        </td>
        <td align = 'center' width = '200'>
            <a href = 'https://ancient-shrine-3f1.notion.site/Main-Page-2ae151b029cd80439f2fc27619e4f1f3?source=copy_link' target = 'blank'>
                <img src = "https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg" width = '80' height = '80' alt = 'notion'/>
            </a>
        </td>
    </tr>
    <tr>
        <td align = 'center'>
            <strong>Repository</strong>
        </td>
        <td align = 'center'>
            <strong>Notion</strong>
        </td>
    </tr>
</table>

<br/>

<div id='5'></div>

## 🖥️ 주요 기능


<details>
    <summary><h3>봇 세팅 (관리자 전용)</h3></summary>

<br />

| 출석 채널 설정 | <img src="https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/f957a078b9ec42ca82be058a13f7e1bb.gif" width="350"/> |
| --- | --- |
| 출석 알람 시 설정 | <img src="https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/e153428c912349c6917aa6c7d53e689c.gif" width="350"/> |
| 공부 음성채널 설정 | <img src="https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/11534f96b2e8432ab5ceda44b2eea502.gif" width="350"/> |

</details>


<details>
    <summary><h3>출석</h3></summary>
    <br />


| 출석 체크                                                                                                                   | 출석 현황                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/KakaoTalk_20251117_163654672_01.gif" width="480"/> | <img src="https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/KakaoTalk_20251117_163654672_02.gif" width="300"/> |

| 출석 순위                                                                                                                | 출석 알람                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/KakaoTalk_20251117_163654672.gif" width="500"/> | <img src="https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/attendance_alarm.png" alt="attendance alarm" width="500"/> |

</details>

<details>
    <summary><h3>음성 채널 입퇴장</summary>
    <br />

| 음성채널 입장                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 음성채널 퇴장                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|![KakaoTalk_20251118_170802876](https://github.com/user-attachments/assets/e41bb3d5-0e2d-47cb-83e5-27c1509989fb)  |<img width="535" height="105" alt="음성채널_퇴장" src="https://github.com/user-attachments/assets/21e74803-9ec4-4bfc-8e6a-b80c2b95a5e1" />  |

</details>

<details>
    <summary><h3>공부 시간 측정 및 통계</summary>

<br />

| 측정 시간 DM 전송 |
|:------------------:|
| <img src="https://github.com/user-attachments/assets/00275477-d01c-42be-a41d-404c8e0acc72" width="400"/> <img src="https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/515623247-33d6f30f-5169-406c-b573-d356b7849d32.png" width="400"/> |

<br />

| 명령어 입력 칸                                                                                                                | 공부시간 명령어 별 통계                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/92aaad127d8644dc8fc9c49bd87c3807.gif" width="300"/> | ![공부시간_명령어_실행](https://github.com/user-attachments/assets/66297d86-f06c-42d4-ab49-79f936914379) |

</details>

<details>
    <summary><h3>부가 명령어</h3></summary>
<br />

| 인사                                                                                                                   | 대시보드                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| <img src='https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/33d4e815e4674fdca040ce922aa2c081.gif' width="400"/> | <img src="https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/165d24c0992c4b109d69146da2562fda.gif" width="400"/> |


| 오늘의 유머                                                                                                                   | 백준 문제 추천                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| <img src='https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/1b884d2bc75e4a9ca9b6b0da6a64d7ce.gif' width="400"/> | <img src="https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/0ffabf89b13d4b5987772866ffd41f09.gif" width="300"/> |


  </details>

<br />

<div id='6'></div>

## 📉 봇 플로우 차트

<details>
    <summary><strong>출석</strong></summary>
    <br />
    <img width="800" alt="출_다이어그램" src="https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/Untitled diagram-2025-11-18-074844.png" />
    
</details>

<details>
    <summary><strong>공부 시간 측정</strong></summary>
    <br />
    <img width="800" height="1060" alt="공부시간측정_다이어그램" src="https://github.com/user-attachments/assets/42086f9a-7e16-4b89-8219-d9b807a6c45c" />
    
</details>

<details>
    <summary><strong>공부 시간 통계</strong></summary>
    <br />
    <img width="600" height="1060" alt="공부시간통계_다이어그램" src="https://github.com/user-attachments/assets/9d64e8fa-88a4-40a8-b80b-19099d9fd52e" />
    
</details>

