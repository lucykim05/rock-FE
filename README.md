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

## 프로젝트 개요

- 진행 기간 : 2025.11.4 ~ 2025.11.25
- DiscordJS 기반 스터디 헬퍼 봇

## 주제 선정 이유

- 디스코드로 스터디를 진행하는데 있어 도움을 줄 수 있는 헬퍼 봇을 만들고자 하였습니다.
- 우리가 원하는 기능을 제공하는 봇이었으면 좋겠다는 생각에 직접 구현해보게 되었습니다.
- 블라

<br />

## 프로그램 실행 방법

### 기초 패키지 설정

1. 로컬에 `clone repository` 진행
2. 터미널에 `npm install`입력하여 라이브러리 적용
3. `config.json` 파일 생성 후 아래처럼 bot token 입력하기 (token이 필요한 경우 개발자에게 문의)

```
{
    "token": [token];
}
```

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
                - 프로젝트 세팅<br />
                - 공부 시간 기록 구현<br />
                - 로고 & 봇 디자인
            </td>
            <td align = 'center' valign = 'top'>
                - DB 세팅<br />
                - 노션 세팅<br />
                - 출석 및 봇 세팅 기능 구현<br />
                - 봇 배포
            </td>
        </tr>
    </table>
</div>

<div id='3'></div>

## 🛠️ 기술 스택

### 개발 환경 & 언어

![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?logo=visualstudiocode&logoColor=fff&style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=fff&style=for-the-badge)

### 라이브러리

![discord.js](https://img.shields.io/badge/discord.js-5865F2?logo=discord&logoColor=fff&style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=fff&style=for-the-badge)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=000&style=for-the-badge)

### 배포 & 협업

![Railway](https://img.shields.io/badge/Railway-0B0D0E?logo=railway&logoColor=fff&style=for-the-badge)
![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=fff&style=for-the-badge)
![Notion](https://img.shields.io/badge/Notion-000000?logo=notion&logoColor=fff&style=for-the-badge)
![node-schedule](https://img.shields.io/badge/node--schedule-FF4136?logo=node.js&logoColor=fff&style=for-the-badge)


<br />

<div id='4'></div>

## 프로젝트 문서

<table>
    <tr>
        <td align = 'center' width = '200'>
            <a href = 'https://github.com/woowa-discord/rock-FE' target = 'blank'>
                <img src = "https://img.icons8.com/ios11/512/FFFFFF/github.png" width = '80' height = '80' alt = 'repo'/>
            </a>
        </td>
        <td align = 'center' width = '200'>
            <a href = 'https://ancient-shrine-3f1.notion.site/Main-Page-2ae151b029cd80439f2fc27619e4f1f3?pvs=74' target = 'blank'>
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

## 주요 기능

### 봇 세팅 (관리자 전용)

| 출석 채널 설정 | <img src="https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/f957a078b9ec42ca82be058a13f7e1bb.gif" width="350"/> |
| --- | --- |
| 출석 알람 시 설정 | <img src="https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/e153428c912349c6917aa6c7d53e689c.gif" width="350"/> |
| 공부 음성채널 설정 | <img src="https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/11534f96b2e8432ab5ceda44b2eea502.gif" width="350"/> |

<br />


### 출석

| 출석 체크                                                                                                                   | 출석 현황                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/KakaoTalk_20251117_163654672_01.gif" width="480"/> | <img src="https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/KakaoTalk_20251117_163654672_02.gif" width="300"/> |

| 출석 순위                                                                                                                | 출석 알람                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/KakaoTalk_20251117_163654672.gif" width="500"/> | <img src="https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/attendance_alarm.png" alt="attendance alarm" width="500"/> |

<br />

### 음성 채널 입퇴장

| 음성채널 입장                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 음성채널 퇴장                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|![KakaoTalk_20251118_170802876](https://github.com/user-attachments/assets/e41bb3d5-0e2d-47cb-83e5-27c1509989fb)  |<img width="535" height="105" alt="음성채널_퇴장" src="https://github.com/user-attachments/assets/21e74803-9ec4-4bfc-8e6a-b80c2b95a5e1" />  |

### 시간 측정

| 측정 시간 DM 전송 |
|:------------------:|
| <img src="https://github.com/user-attachments/assets/00275477-d01c-42be-a41d-404c8e0acc72" width="400"/> <img src="https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/515623247-33d6f30f-5169-406c-b573-d356b7849d32.png" width="400"/> |


### 공부시간 통계

| 명령어 입력 칸                                                                                                                | 공부시간 명령어 별 통계                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/92aaad127d8644dc8fc9c49bd87c3807.gif" width="300"/> | ![공부시간_명령어_실행](https://github.com/user-attachments/assets/66297d86-f06c-42d4-ab49-79f936914379) |


<br />

### 랜덤 유머 츌력 

| 오늘의 유머 실행                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src = 'https://raw.githubusercontent.com/lucykim05/image/main/rock_FE/1b884d2bc75e4a9ca9b6b0da6a64d7ce.gif' width = '400'/>
  
<br />

<div id='6'></div>

## 플로우 차트

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

