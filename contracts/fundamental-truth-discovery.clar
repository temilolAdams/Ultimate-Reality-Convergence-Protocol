;; Fundamental Truth Discovery Contract

(define-map truths
  { id: uint }
  { statement: (string-ascii 128), confidence: uint }
)

(define-data-var next-id uint u0)

(define-public (propose-truth (statement (string-ascii 128)) (confidence uint))
  (let ((id (var-get next-id)))
    (var-set next-id (+ id u1))
    (ok (map-set truths { id: id } { statement: statement, confidence: confidence }))
  )
)

(define-read-only (get-truth (id uint))
  (map-get? truths { id: id })
)

