# SQL Injection Zafiyeti Örneği

Bu dizin, SQL injection güvenlik açığı ile ilgili aşağıdaki dosyaları içermektedir:

1. **vulnerable.js** - SQL Injection açığı içeren örnek kod
2. **fixed.js** - SQL Injection açığı düzeltilmiş güvenli kod

## Açıklama

SQL Injection, kullanıcı girdisinin doğrudan SQL sorgularında kullanılmasından kaynaklanan ve çok yaygın olan bir güvenlik açığıdır. `vulnerable.js` dosyasında, kullanıcı girdisi herhangi bir doğrulama veya parametreli sorgu kullanmadan doğrudan SQL sorgusuna eklenmektedir.

## OWASP Bilgisi

* **Kategori**: Enjeksiyon (Injection)
* **OWASP Top 10 (2021)**: A03:2021 - Enjeksiyon
* **CVSS Skoru**: 8.6 (Yüksek)
* **Vektör String**: CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:L/A:L

