"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import SectionHead from "./SectionHead";

const SPACE = ["아파트", "주택", "상업공간", "기타"];
const WORK = ["전체 리모델링", "부분 인테리어", "신규 인테리어"];
const BUDGET = ["3천만 원 미만", "3천만 – 5천만 원", "5천만 – 1억 원", "1억 – 2억 원", "2억 원 이상", "상담 후 결정"];
const WHEN = ["1개월 이내", "1 – 3개월 이내", "3 – 6개월 이내", "6개월 이후", "아직 미정"];
const PHONE_RE = /^01[016789]-?\d{3,4}-?\d{4}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MB = 1024 * 1024;

type Errors = Partial<Record<"name" | "phone" | "email" | "space" | "work" | "message" | "files" | "consent", string>>;
type Status = { kind: "ok" | "err" | "info"; title: string; text: string } | null;

function formatPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  if (d.length === 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}
const fmtSize = (b: number) => (b >= MB ? `${(b / MB).toFixed(1)}MB` : `${Math.max(1, Math.round(b / 1024))}KB`);

export default function Contact() {
  const f = site.form;
  const c = site.company;
  const formRef = useRef<HTMLFormElement>(null);
  const loadedAt = useRef(0);
  const [errors, setErrors] = useState<Errors>({});
  const [files, setFiles] = useState<File[]>([]);
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status) statusRef.current?.focus();
  }, [status]);

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    e.target.value = "";
    const next = [...files];
    let msg = "";
    for (const file of picked) {
      const okType = f.accept.includes(file.type) || /\.(jpe?g|png|webp|heic|heif)$/i.test(file.name);
      if (!okType) { msg = `${file.name}: JPG, PNG, WEBP, HEIC 이미지만 첨부할 수 있어요.`; continue; }
      if (file.size > f.maxFileMB * MB) { msg = `${file.name}: 파일 1개는 ${f.maxFileMB}MB 이하만 가능해요.`; continue; }
      if (next.length >= f.maxFiles) { msg = `참고 이미지는 최대 ${f.maxFiles}장까지 첨부할 수 있어요.`; break; }
      const total = next.reduce((s, x) => s + x.size, 0) + file.size;
      if (total > f.maxTotalMB * MB) { msg = `첨부 파일 전체 용량은 ${f.maxTotalMB}MB 이하여야 해요.`; continue; }
      next.push(file);
    }
    setFiles(next);
    setErrors((er) => ({ ...er, files: msg || undefined }));
  };

  const validate = (fd: FormData): Errors => {
    const er: Errors = {};
    const name = String(fd.get("name") ?? "").trim();
    const ph = String(fd.get("phone") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    if (name.length < 2) er.name = "이름을 2자 이상 입력해 주세요.";
    if (!ph) er.phone = "연락받으실 휴대폰 번호를 입력해 주세요.";
    else if (!PHONE_RE.test(ph)) er.phone = "휴대폰 번호 형식을 확인해 주세요. (예: 010-1234-5678)";
    if (email && !EMAIL_RE.test(email)) er.email = "이메일 형식을 확인해 주세요.";
    if (!fd.get("space_type")) er.space = "공간 유형을 선택해 주세요.";
    if (!fd.get("work_type")) er.work = "공사 유형을 선택해 주세요.";
    if (message.length < 10) er.message = "문의 내용을 10자 이상 적어 주세요.";
    if (!fd.get("consent")) er.consent = "개인정보 수집·이용에 동의해 주셔야 상담 신청이 가능해요.";
    return er;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus(null);

    // 스팸 방지 1: 사람에게 보이지 않는 칸이 채워져 있으면 전송하지 않아요.
    if (String(fd.get("bot-field") ?? "")) return;

    const er = validate(fd);
    setErrors(er);
    const firstKey = (["name", "phone", "email", "space", "work", "message", "consent"] as const).find((k) => er[k]);
    if (firstKey) {
      const target = form.querySelector<HTMLElement>(`[data-field="${firstKey}"]`);
      target?.focus();
      return;
    }

    // 스팸 방지 2: 페이지를 연 지 3초 안에 보내는 자동 입력은 막아요.
    if (Date.now() - loadedAt.current < 3000) {
      setStatus({ kind: "err", title: "잠시 후 다시 눌러 주세요.", text: "너무 빠르게 제출되어 자동 입력으로 판단했어요. 몇 초 뒤 다시 시도해 주세요." });
      return;
    }

    const provider = f.provider === "endpoint" && !f.endpoint ? "none" : f.provider;
    if (provider === "none") {
      setStatus({
        kind: "info",
        title: "아직 상담 접수 서비스가 연결되지 않았어요.",
        text: "입력하신 내용은 전송되지 않았습니다. 사이트 관리자는 src/content/site.ts 의 form 설정에서 접수 서비스를 연결해 주세요." + (c.phone ? ` 급한 문의는 ${c.phone} 로 연락 주세요.` : ""),
      });
      return;
    }

    const isLocal = location.protocol === "file:" || ["localhost", "127.0.0.1", "0.0.0.0"].includes(location.hostname);
    if (provider === "netlify" && isLocal) {
      setStatus({
        kind: "info",
        title: "미리보기 환경이라 실제로 전송되지 않았어요.",
        text: "입력 확인은 모두 통과했습니다. Netlify에 배포하면 같은 폼이 Netlify Forms로 접수되고, 관리자 화면(Forms)에서 확인할 수 있어요.",
      });
      return;
    }

    // 파일은 attachment1~3 로 나눠 보내요 (Netlify Forms는 칸 하나에 파일 1개).
    fd.delete("attachments");
    files.forEach((file, i) => fd.append(`attachment${i + 1}`, file, file.name));
    fd.set("phone", formatPhone(String(fd.get("phone"))));

    setSending(true);
    try {
      const res =
        provider === "netlify"
          ? await fetch("/__forms.html", { method: "POST", body: fd })
          : await fetch(f.endpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setFiles([]);
      setPhone("");
      setStatus({
        kind: "ok",
        title: "상담 신청이 접수되었습니다.",
        text: "남겨주신 연락처로 담당 디자이너가 연락드릴게요." + (c.hours ? ` (상담 가능 시간: ${c.hours})` : ""),
      });
    } catch {
      setStatus({
        kind: "err",
        title: "전송 중 문제가 생겼어요.",
        text: "입력하신 내용은 그대로 남아 있어요. 잠시 후 다시 시도해 주세요." + (c.phone ? ` 계속 안 되면 ${c.phone} 로 연락 주세요.` : ""),
      });
    } finally {
      setSending(false);
    }
  };

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p className="err" id={`err-${k}`}>
        {errors[k]}
      </p>
    ) : null;
  const inv = (k: keyof Errors) => (errors[k] ? { "aria-invalid": true as const, "aria-describedby": `err-${k}` } : {});
  const clear = (k: keyof Errors) => () => errors[k] && setErrors((er) => ({ ...er, [k]: undefined }));

  const info: [string, string][] = [
    ["전화", c.phone],
    ["이메일", c.email],
    ["상담 시간", c.hours],
    ["주소", c.address],
  ];

  return (
    <section id="contact" className="sec ct" aria-labelledby="ct-title">
      <div className="wrap ct-grid">
        <div className="ct-side">
          <SectionHead no="09" label="Contact" id="ct-title" title="Your Space, Our Inspiration." subtitle="당신이 꿈꾸는 공간에 대해 이야기해주세요." />
          <dl className="ct-info">
            {info.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v || <em className="tbd">입력 필요</em>}</dd>
              </div>
            ))}
          </dl>
        </div>

        <form ref={formRef} className="form" name={f.name} method="POST" onSubmit={onSubmit} noValidate encType="multipart/form-data" aria-describedby="form-req">
          <input type="hidden" name="form-name" value={f.name} />
          <p className="hp" aria-hidden="true">
            <label>
              이 칸은 비워 두세요 <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>
          <p id="form-req" className="span2 fld hint" style={{ fontSize: 13 }}>
            <span>
              <span aria-hidden="true">*</span> 표시는 필수 항목입니다.
            </span>
          </p>

          <div className="fld">
            <label htmlFor="f-name">
              이름<span className="req">*</span>
            </label>
            <input id="f-name" data-field="name" className="in" name="name" autoComplete="name" required maxLength={40} onInput={clear("name")} {...inv("name")} />
            {err("name")}
          </div>

          <div className="fld">
            <label htmlFor="f-phone">
              연락처<span className="req">*</span>
            </label>
            <input
              id="f-phone"
              data-field="phone"
              className="in"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="010-1234-5678"
              required
              value={phone}
              onChange={(e) => {
                setPhone(formatPhone(e.target.value));
                clear("phone")();
              }}
              {...inv("phone")}
            />
            {err("phone")}
          </div>

          <div className="fld span2">
            <label htmlFor="f-email">
              이메일<span className="req">선택</span>
            </label>
            <input id="f-email" data-field="email" className="in" name="email" type="email" autoComplete="email" placeholder="you@example.com" onInput={clear("email")} {...inv("email")} />
            {err("email")}
          </div>

          <fieldset className="fld span2">
            <legend>
              공간 유형<span className="req">*</span>
            </legend>
            <div className="chips" data-invalid={!!errors.space} {...(errors.space ? { "aria-describedby": "err-space" } : {})}>
              {SPACE.map((v, i) => (
                <label key={v} className="chip">
                  <input type="radio" name="space_type" value={v} data-field={i === 0 ? "space" : undefined} onChange={clear("space")} />
                  <span>{v}</span>
                </label>
              ))}
            </div>
            {err("space")}
          </fieldset>

          <fieldset className="fld span2">
            <legend>
              공사 유형<span className="req">*</span>
            </legend>
            <div className="chips" data-invalid={!!errors.work}>
              {WORK.map((v, i) => (
                <label key={v} className="chip">
                  <input type="radio" name="work_type" value={v} data-field={i === 0 ? "work" : undefined} onChange={clear("work")} />
                  <span>{v}</span>
                </label>
              ))}
            </div>
            {err("work")}
          </fieldset>

          <div className="fld">
            <label htmlFor="f-area">공간 면적</label>
            <input id="f-area" className="in" name="area" placeholder="예: 34평 또는 112㎡" maxLength={40} />
          </div>

          <div className="fld">
            <label htmlFor="f-region">시공 희망 지역</label>
            <input id="f-region" className="in" name="region" placeholder="예: 서울 성동구" autoComplete="address-level2" maxLength={60} />
          </div>

          <div className="fld">
            <label htmlFor="f-budget">예상 예산</label>
            <select id="f-budget" className="in" name="budget" defaultValue="">
              <option value="">선택해 주세요</option>
              {BUDGET.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </div>

          <div className="fld">
            <label htmlFor="f-when">공사 희망 시기</label>
            <select id="f-when" className="in" name="timing" defaultValue="">
              <option value="">선택해 주세요</option>
              {WHEN.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </div>

          <div className="fld span2">
            <label htmlFor="f-msg">
              문의 내용<span className="req">*</span>
            </label>
            <textarea
              id="f-msg"
              data-field="message"
              className="in"
              name="message"
              required
              maxLength={2000}
              placeholder="현재 공간의 상태, 바꾸고 싶은 부분, 좋아하는 분위기 등을 편하게 적어 주세요."
              onInput={clear("message")}
              {...inv("message")}
            />
            {err("message")}
          </div>

          <div className="fld span2">
            <span className="lbl" id="f-files-lbl">
              참고 이미지 첨부<span className="req">선택</span>
            </span>
            <div className="file-drop">
              <input id="f-files" name="attachments" type="file" accept={f.accept.join(",")} multiple onChange={onFiles} aria-labelledby="f-files-lbl" aria-describedby="f-files-hint" />
              <span className="pick" aria-hidden="true">
                파일 선택
              </span>
              <span id="f-files-hint" className="hint">
                JPG·PNG·WEBP·HEIC, 1장당 {f.maxFileMB}MB · 최대 {f.maxFiles}장 · 합계 {f.maxTotalMB}MB
              </span>
            </div>
            {files.length > 0 && (
              <ul className="file-list" aria-label="첨부한 파일">
                {files.map((file, i) => (
                  <li key={file.name + i}>
                    <span>
                      {file.name} <span className="hint">({fmtSize(file.size)})</span>
                    </span>
                    <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))} aria-label={`${file.name} 첨부 취소`}>
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {errors.files && (
              <p className="err" role="alert">
                {errors.files}
              </p>
            )}
          </div>

          <div className="fld span2 consent">
            <label className="consent-row">
              <input type="checkbox" name="consent" value="동의" data-field="consent" onChange={clear("consent")} {...inv("consent")} />
              <span>
                <strong>[필수]</strong> 개인정보 수집·이용에 동의합니다.
              </span>
            </label>
            <details>
              <summary>수집 항목과 보관 기간 보기</summary>
              <ul>
                <li>수집 항목: 이름, 연락처, (선택) 이메일, 공간 정보, 문의 내용, 첨부 이미지</li>
                <li>이용 목적: 인테리어 상담 신청 확인 및 상담 진행 연락</li>
                <li>보관 기간: 상담 완료 후 1년 (관계 법령에 따라 보관이 필요한 경우 그 기간)</li>
                <li>동의를 거부할 수 있으나, 거부 시 상담 신청이 어렵습니다.</li>
              </ul>
              <p style={{ marginTop: 8 }}>
                자세한 내용은{" "}
                <a className="link-line" href="/privacy/">
                  개인정보처리방침
                </a>
                을 확인해 주세요.
              </p>
            </details>
            {err("consent")}
          </div>

          <div className="span2 submit-row">
            <button className="btn btn-dark" type="submit" disabled={sending}>
              {sending ? "전송 중…" : "프로젝트 상담 신청하기"} <span className="arr" aria-hidden="true" />
            </button>
            {Object.values(errors).some(Boolean) && !status && (
              <p className="err" role="alert">
                입력 내용을 다시 확인해 주세요.
              </p>
            )}
          </div>

          <div className="span2" aria-live="polite">
            {status && (
              <div ref={statusRef} tabIndex={-1} className={`status is-${status.kind}`} role={status.kind === "err" ? "alert" : "status"}>
                <strong>{status.title}</strong>
                {status.text}
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
