import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: `${site.brand} 개인정보처리방침`,
  alternates: { canonical: "/privacy/" },
};

/**
 * ⚠️ 아래는 상담 문의 폼 기준의 기본 양식이에요. 실제 사업자 정보와 운영 방식(위탁 업체, 보관 기간 등)에 맞게
 *    반드시 확인·수정한 뒤 게시하세요. 필요하면 개인정보보호위원회 '개인정보 처리방침 작성지침'을 참고하세요.
 */
export default function Privacy() {
  const c = site.company;
  const v = (x: string) => x || "[입력 필요]";
  const effective = "[시행일 입력 필요]";
  return (
    <>
      <Header solid />
      <main id="main" className="legal">
        <div className="wrap">
          <p className="eyebrow">Privacy Policy</p>
          <h1 className="mt-5">개인정보처리방침</h1>
          <div className="doc">
            <p className="tbd-box">이 문서는 기본 양식입니다. 대괄호 [ ] 안의 항목과 위탁 업체, 보관 기간을 실제 운영 기준으로 채운 뒤 게시해 주세요.</p>
            <section>
              <p>
                {v(c.name)}(이하 &lsquo;회사&rsquo;)는 「개인정보 보호법」 등 관련 법령을 지키며, 홈페이지 상담 문의를 통해 받은 개인정보를 아래와 같이 처리합니다.
              </p>
            </section>
            <section>
              <h2>1. 수집하는 개인정보 항목과 수집 방법</h2>
              <table>
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>항목</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>필수</td>
                    <td>이름, 연락처(휴대폰 번호), 공간 유형, 공사 유형, 문의 내용</td>
                  </tr>
                  <tr>
                    <td>선택</td>
                    <td>이메일, 공간 면적, 시공 희망 지역, 예상 예산, 공사 희망 시기, 참고 이미지</td>
                  </tr>
                  <tr>
                    <td>자동 수집</td>
                    <td>접속 IP, 접속 일시 (폼 접수 서비스의 스팸 방지 목적)</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2">수집 방법: 홈페이지 상담 문의 폼</p>
            </section>
            <section>
              <h2>2. 개인정보의 이용 목적</h2>
              <ul>
                <li>인테리어 상담 신청 확인 및 상담 진행을 위한 연락</li>
                <li>현장 확인, 디자인 제안, 견적 안내</li>
                <li>스팸·부정 이용 방지</li>
              </ul>
            </section>
            <section>
              <h2>3. 보유 및 이용 기간</h2>
              <p>상담 완료 후 [1년] 보관한 뒤 지체 없이 파기합니다. 계약이 체결된 경우에는 「전자상거래 등에서의 소비자보호에 관한 법률」 등 관련 법령이 정한 기간 동안 보관합니다.</p>
            </section>
            <section>
              <h2>4. 개인정보의 제3자 제공</h2>
              <p>회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 법령에 따라 요구되는 경우는 예외로 합니다.</p>
            </section>
            <section>
              <h2>5. 개인정보 처리의 위탁</h2>
              <table>
                <thead>
                  <tr>
                    <th>위탁받는 자</th>
                    <th>위탁 업무</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>[예: Netlify, Inc. (미국)]</td>
                    <td>홈페이지 호스팅 및 상담 문의 폼 접수·보관</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2">해외 서비스를 이용하는 경우 이전되는 국가, 이전 일시·방법, 보유 기간을 함께 적어 주세요.</p>
            </section>
            <section>
              <h2>6. 개인정보의 파기</h2>
              <p>보유 기간이 끝나거나 처리 목적이 달성된 개인정보는 지체 없이 파기합니다. 전자 파일은 복구할 수 없는 방법으로 삭제하고, 출력물은 분쇄하거나 소각합니다.</p>
            </section>
            <section>
              <h2>7. 이용자의 권리</h2>
              <p>이용자는 언제든지 자신의 개인정보 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다. 아래 연락처로 요청하시면 지체 없이 조치하겠습니다.</p>
            </section>
            <section>
              <h2>8. 개인정보 보호책임자</h2>
              <ul>
                <li>책임자: {v(c.ceo)}</li>
                <li>연락처: {v(c.phone)}</li>
                <li>이메일: {v(c.email)}</li>
              </ul>
              <p className="mt-2">개인정보 침해에 대한 신고나 상담은 개인정보침해신고센터(국번 없이 118), 개인정보분쟁조정위원회(1833-6972)에 문의하실 수 있습니다.</p>
            </section>
            <section>
              <h2>9. 시행일</h2>
              <p>이 개인정보처리방침은 {effective}부터 적용됩니다.</p>
            </section>
            <p>
              <a className="btn btn-ghost" href="/">
                홈으로 돌아가기
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer home="/" />
    </>
  );
}
