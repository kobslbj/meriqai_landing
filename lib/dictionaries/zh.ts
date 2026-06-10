import type { Dictionary } from "./types"

export const zh: Dictionary = {
  metadata: {
    title: "Meriq AI — 協助傳統報關行導入 AI",
    description:
      "Meriq AI 協助報關行自動整理進出口文件、追蹤缺件與降低人工輸入錯誤，讓同樣人力處理更多案件。",
  },

  navbar: {
    links: [
      { label: "工作流程", id: "workflows" },
      { label: "運作方式", id: "how-it-works" },
      { label: "合作方案", id: "pilot" },
    ],
    requestPilot: "預約 Demo",
  },

  hero: {
    badge: "協助傳統報關行導入 AI",

    headline: "讓 AI 協助報關行減少人工追件與文件錯誤。",

    subheadline:
      "Meriq AI 自動整理 Invoice、Packing List、BL 與進出口文件，協助報關行追蹤缺件、降低人工輸入錯誤，讓同樣人力處理更多案件。",

    primaryCta: "預約 Demo",

    secondaryCta: "查看流程範例",

    card: {
      header: "案件:ENT-49281 · LAX",
      status: "待補件",

      importerLabel: "進口商",
      importerValue: "Pacific Grain Imports Inc.",

      supplierLabel: "供應商",
      supplierValue: "Everlink Foods Co., Ltd.",

      filingReadinessLabel: "報關狀態",
      filingReadinessValue: "尚未完成",

      ownerLabel: "目前負責",
      ownerValue: "供應商",

      blockerLabel: "待處理事項",
      blockerValue: "等待供應商提供 FDA 文件",

      lastFollowUpLabel: "最後追蹤",
      lastFollowUpValue: "3 小時前",

      riskLabel: "風險",
      riskValue: "可能延誤報關",
    },

    actions: ["產生供應商追蹤信", "查看缺件項目", "草擬客戶回覆"],
  },

  painSection: {
    title: "哪些流程最浪費你的團隊時間？",

    subtitle: "選出最常造成補件、延誤與人工追蹤的工作流程。",

    previewLabel: "流程預覽",

    question: "這就是你們每天卡住的地方嗎？",

    validateCta: "和我們一起驗證流程",

    toneFallback: {
      ready: "完成",
      warning: "待處理",
      blocking: "阻擋中",
      neutral: "資訊",
    },

    cards: [
      {
        id: "missing_supplier_documents",

        title: "供應商文件缺漏",

        description:
          "COO、FDA 文件、MSDS、APHIS 證明或產品規格經常延遲、不完整或反覆補件。",

        demo: {
          title: "AI 在報關前就找出缺少文件。",

          lines: [
            {
              label: "缺少",
              value: "FDA Prior Notice",
              tone: "blocking",
            },

            {
              label: "缺少",
              value: "Food Facility Registration",
              tone: "blocking",
            },

            {
              label: "缺少",
              value: "Certificate of Origin",
              tone: "warning",
            },

            {
              label: "目前負責",
              value: "供應商",
            },

            {
              label: "建議下一步",
              value: "發送補件追蹤信",
              tone: "ready",
            },
          ],
        },
      },

      {
        id: "fda_aphis_readiness",

        title: "FDA / APHIS 文件確認",

        description:
          "食品、農產品、保健食品與受管制貨物，報關前通常需要額外文件與確認。",

        demo: {
          title: "更早發現受管制貨物的缺件風險。",

          lines: [
            {
              label: "產品類型",
              value: "穀物食品",
            },

            {
              label: "原產地",
              value: "台灣",
            },

            {
              label: "可能需要",
              value: "FDA Prior Notice",
              tone: "warning",
            },

            {
              label: "可能需要",
              value: "FDA Food Facility Registration",
              tone: "warning",
            },

            {
              label: "狀態",
              value: "需人工確認",
              tone: "neutral",
            },
          ],
        },
      },

      {
        id: "email_followups",

        title: "重複追件與 Email 往返",

        description: "團隊每天花大量時間催文件、確認進度與重複詢問相同問題。",

        demo: {
          title: "把人工追件變成結構化流程。",

          lines: [
            {
              label: "供應商尚未回覆",
              tone: "warning",
            },

            {
              label: "最後追蹤",
              value: "3 小時前",
            },

            {
              label: "缺少項目",
              value: "3",
              tone: "blocking",
            },

            {
              label: "建議動作",
              value: "發送追蹤清單",
              tone: "ready",
            },
          ],
        },
      },

      {
        id: "hts_classification_uncertainty",

        title: "HTS / 稅則資訊不足",

        description: "產品資訊不完整，導致團隊需要反覆確認材質、用途與成分。",

        demo: {
          title: "AI 協助整理歸類需要的產品資訊。",

          lines: [
            {
              label: "缺少產品材質",
              tone: "warning",
            },

            {
              label: "缺少用途說明",
              tone: "warning",
            },

            {
              label: "缺少成分資訊",
              tone: "warning",
            },

            {
              label: "建議動作",
              value: "索取產品規格",
              tone: "ready",
            },
          ],
        },
      },

      {
        id: "shipment_blocker_visibility",

        title: "案件卡關看不見",

        description: "不知道哪些案件被卡住、誰負責處理、下一步該做什麼。",

        demo: {
          title: "每個待處理事項都有明確負責人。",

          lines: [
            {
              label: "FDA Prior Notice → 供應商",
              value: "阻擋中",
              tone: "blocking",
            },

            {
              label: "COO → 進口商",
              value: "待處理",
              tone: "warning",
            },

            {
              label: "數量不符 → 報關行",
              value: "待確認",
              tone: "warning",
            },

            {
              label: "報關狀態",
              value: "尚未完成",
              tone: "blocking",
            },
          ],
        },
      },

      {
        id: "customer_intake_chaos",

        title: "客戶資料混亂",

        description:
          "客戶提供的資料散落在 Email、PDF、Excel、截圖與對話紀錄中。",

        demo: {
          title: "把雜亂資料整理成可處理案件。",

          lines: [
            {
              label: "已擷取進口商資訊",
              tone: "ready",
            },

            {
              label: "已擷取供應商資訊",
              tone: "ready",
            },

            {
              label: "已辨識產品類別",
              tone: "ready",
            },

            {
              label: "缺少受管制文件",
              tone: "warning",
            },

            {
              label: "已產生建議追問",
              tone: "neutral",
            },
          ],
        },
      },

      {
        id: "importability_questions",

        title: "客戶一直問「這能不能進口？」",

        description:
          "客戶經常詢問產品能否進口、需要哪些文件、是否涉及 FDA 或其他規範。",

        demo: {
          title: "AI 協助整理進口問題所需資訊。",

          lines: [
            {
              label: "客戶問題",
              value: "「這項產品可以從台灣進口到美國嗎？」",
            },

            {
              label: "已整理資訊",
              value: "產品類別 · 原產地 · 用途 · 成分 · 供應商資訊",
            },

            {
              label: "可能需要",
              value: "FDA Prior Notice",
              tone: "warning",
            },

            {
              label: "可能需要",
              value: "Food Facility Registration",
              tone: "warning",
            },

            {
              label: "可能需要",
              value: "Certificate of Origin",
              tone: "warning",
            },

            {
              label: "狀態",
              value: "需人工確認",
              tone: "neutral",
            },

            {
              label: "建議下一步",
              value: "草擬回覆並索取補充資訊",
              tone: "ready",
            },
          ],

          note: "AI 僅協助整理與草擬，最終仍由報關行確認。",
        },
      },
    ],
  },

  workflow: {
    title: "從人工追件，到 AI 協助整理文件。",

    subtitle:
      "Meriq 協助報關行在正式報關前，自動整理文件、追蹤缺件與確認待處理事項。",

    beforeTitle: "導入前",

    afterTitle: "導入後",

    before: [
      "Invoice、Packing List 散落在 Email 與 LINE",
      "人工核對缺少文件",
      "需要反覆催供應商補件",
      "新人容易遺漏文件與出錯",
      "問題常在報關前才發現",
      "不知道案件卡在哪",
    ],

    after: [
      "AI 自動整理進出口文件",
      "自動找出缺少文件與異常",
      "每個待處理事項都有負責人",
      "自動草擬追蹤 Email",
      "新人更快上手",
      "報關前更早發現問題",
    ],

    cta: "查看流程範例",
  },

  features: {
    title: "為報關前最繁瑣的文件流程而設計。",

    subtitle:
      "Meriq 協助團隊在正式報關前，先把文件、缺件與待處理事項整理完成。",

    cards: [
      {
        id: "ai_shipment_intake",

        title: "AI 文件整理",

        description: "自動整理 Email、Invoice、Packing List、BL 與供應商文件。",
      },

      {
        id: "blocker_ownership_tracking",

        title: "缺件追蹤",

        description: "自動找出缺少文件、待確認事項與異常欄位。",
      },

      {
        id: "supplier_followup_drafting",

        title: "供應商追蹤信草擬",

        description: "自動產生 Email 草稿，向供應商索取缺少文件。",
      },

      {
        id: "filing_readiness_review",

        title: "報關前文件檢查",

        description: "協助確認案件是否已備妥，降低報關前遺漏與錯誤。",
      },

      {
        id: "operational_memory",

        title: "歷史案件記錄",

        description: "保留常見缺件、供應商問題與歷史處理紀錄。",
      },

      {
        id: "import_question_context_layer",

        title: "AI 協助回覆進口問題",

        description: "協助整理產品資訊與所需文件，快速草擬客戶回覆。",

        details: [
          "「這能進口嗎？」",
          "「需要哪些文件？」",
          "「會需要 FDA 嗎？」",
        ],
      },

      {
        id: "human_in_the_loop_review",

        title: "人工審核把關",

        description: "AI 協助整理案件，最終仍由報關行人工確認。",
      },
    ],
  },

  dashboard: {
    title: "範例:FDA 管制食品貨運",
    subtitle: "一票貨從散落的文件,進入結構化的營運審核佇列。",
    headerShipment: "貨運:ENT-49281 · 台灣 → LAX",
    headerParties:
      "進口商:Pacific Grain Imports Inc. · 供應商:Everlink Foods Co., Ltd.",
    reason: "原因:缺少 FDA 文件",
    statusPill: "審查暫停",
    readinessPill: "申報就緒:尚未就緒",
    tabs: [
      { id: "extracted_fields", label: "擷取欄位" },
      { id: "blockers", label: "阻礙項目" },
      { id: "followup_email", label: "追蹤信" },
      { id: "historical_patterns", label: "歷史模式" },
      { id: "customer_qa", label: "客戶問答" },
    ],
    extractedFields: [
      { label: "進口商", value: "已比對", tone: "ready" },
      { label: "供應商", value: "已比對", tone: "ready" },
      { label: "COO", value: "台灣" },
      { label: "總金額", value: "USD 78,840" },
      { label: "幣別", value: "USD" },
      { label: "毛重", value: "72,140 kg" },
      { label: "數量不符", value: "警示", tone: "warning" },
    ],
    blockers: {
      itemHeader: "項目",
      ownerHeader: "負責人",
      severityHeader: "嚴重度",
      rows: [
        {
          item: "缺少 FDA Prior Notice",
          owner: "供應商",
          severity: "blocking",
          severityLabel: "阻擋中",
        },
        {
          item: "缺少 FDA Food Facility Registration",
          owner: "供應商",
          severity: "blocking",
          severityLabel: "阻擋中",
        },
        {
          item: "缺少 COO",
          owner: "進口商",
          severity: "warning",
          severityLabel: "警示",
        },
        {
          item: "數量不符",
          owner: "報關行審核",
          severity: "warning",
          severityLabel: "警示",
        },
      ],
    },
    followUp: {
      email: `主旨:ENT-49281 — 申報前仍缺 FDA 文件

Everlink Foods 團隊您好:

我們正在為貨運 ENT-49281(穀物食品,台灣 → LAX)準備報關行審核,目前仍缺少以下文件:

  1. FDA Prior Notice 確認
  2. FDA Food Facility Registration 編號
  3. Certificate of Origin(產地證明)

在收到上述文件之前,申報作業將暫停。能否請您於明日下班前提供文件,或告知預計提供的日期?

謝謝!
營運團隊
Pacific Grain Imports Inc.(Importer of record)`,
      copy: "複製郵件",
      copied: "已複製",
      regenerate: "重新產生草稿",
      note: "僅為草稿 — 經你審核後才會寄出。",
    },
    patterns: {
      items: [
        "台灣產地的穀物類貨運,申報前通常需要 FDA 文件",
        "這家供應商經常遲交 COO",
        "數量不符通常可在收件階段索取管制文件時一併釐清",
      ],
      note: "模式來自團隊過往貨運 — 僅作為脈絡參考,不做決策。",
    },
    qa: {
      customerAsksLabel: "客戶詢問",
      question: "「這項台灣的穀物產品可以進口到美國嗎?」",
      draftLabel: "AI 草稿 — 供報關行審核",
      draft:
        "「根據貨運脈絡,這項產品屬於食品,申報前可能需要 FDA Prior Notice 與 Food Facility Registration。仍需報關行審核與更多產品資訊,才能確認最終要求。」",
      status: "需報關行核准後才能寄出。",
    },
  },

  personas: {
    title: "為夾在客戶、供應商與申報系統之間的團隊而生。",
    cards: [
      {
        id: "customs_brokers",
        title: "報關行",
        copy: "減少申報前追文件、反覆向客戶確認的時間。",
      },
      {
        id: "freight_forwarders",
        title: "貨運承攬業者",
        copy: "一眼看出哪些貨運被卡住、下一步該做什麼。",
      },
      {
        id: "import_compliance_teams",
        title: "進口 / 法遵團隊",
        copy: "更早收齊正確文件,減少出貨前的延誤。",
      },
    ],
  },

  adoption: {
    title: "不需更換現有 ERP 與作業流程",

    bullets: [
      "支援 PDF、Email、掃描檔與 Excel",
      "可先從單一流程開始導入",
      "不改變既有報關流程",
      "人工審核後才送出",
      "協助新人更快上手",
    ],

    artifacts: [
      "commercial_invoice.pdf",
      "packing_list.xlsx",
      "RE: 缺少 COO",
      "supplier_reply.msg",
      "FDA 文件.jpg",
      "BL draft.pdf",
    ],
  },

  pilot: {
    title: "尋找 3–5 家試點合作夥伴。",

    copy: "我們正與報關行、貨運承攬業者與進出口團隊合作，驗證 AI 如何降低人工文件處理成本。",

    especially: "特別適合：",

    focusAreas: [
      "FDA",
      "APHIS",
      "食品進口",
      "農產品",
      "保健食品",
      "受管制貨物",
    ],

    form: {
      emailLabel: "工作 Email",
      emailPlaceholder: "you@company.com",

      companyLabel: "公司名稱",
      companyPlaceholder: "公司名稱",

      roleLabel: "職稱",
      rolePlaceholder: "例如：報關人員",

      bottleneckLabel: "目前最大的流程問題",

      bottleneckPlaceholder: "選擇一個流程",

      messageLabel: "補充說明（選填）",

      messagePlaceholder: "描述目前文件流程、補件流程或團隊遇到的問題…",

      submit: "申請合作",

      submitting: "送出中…",

      submitError: "發生錯誤，請稍後再試。",

      errors: {
        email: "請輸入有效 Email。",
        company: "請填寫公司名稱。",
        role: "請填寫職稱。",
      },

      success: "感謝填寫，我們會與你聯繫，深入了解目前的工作流程。",

      successBookingPrompt: "想更快聊聊？可以直接預約時間。",
    },

    booking: {
      prompt: "想直接聊聊？立即預約時間。",
      cta: "預約時間",
    },
  },

  footer: {
    tagline: "協助傳統報關行導入 AI。",

    copy: "協助報關行與貿易團隊減少人工追件與文件處理成本。",

    rights: "保留一切權利。",
  },
}
