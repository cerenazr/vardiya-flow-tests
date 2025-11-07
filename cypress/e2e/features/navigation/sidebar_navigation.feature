Feature: Panelde gezinti
  Kullanıcı oturum açtıktan sonra sol menüyü kullanarak farklı sayfalara geçebilir.

  Background:
    Given Rails API ayakta
    And API isteklerini izliyorum

  Scenario: Vardiyalar sayfasına geçiş
    Given giriş sayfasını açtım
    And geçerli kimlik bilgileri ile formu gönderirim
    When sol menüden "Vardiyalar" bağlantısını seçerim
    Then vardiya tablosunda en az bir satır görmeliyim

  Scenario: Yeni vardiya oluşturma
    Given giriş sayfasını açtım
    And geçerli kimlik bilgileri ile formu gönderirim
    When sol menüden "Vardiyalar" bağlantısını seçerim
    And vardiya oluşturma formunu açarım
    And vardiya bilgilerini doldururum
    And vardiya formunu gönderirim
    Then vardiya oluşturma isteği başarılı olmalı

  Scenario: Müsaitlik formu ile kayıt
    Given giriş sayfasını açtım
    And geçerli kimlik bilgileri ile formu gönderirim
    When sol menüden "Müsaitlik" bağlantısını seçerim
    And müsaitlik formunu geçerli bilgilerle doldururum
    And müsaitlik formunu gönderirim
    Then müsaitlik isteği başarılı olmalı

  Scenario: İzin talebi gönderimi
    Given giriş sayfasını açtım
    And geçerli kimlik bilgileri ile formu gönderirim
    When sol menüden "İzinler" bağlantısını seçerim
    And izin talebi formunu geçerli bilgilerle doldururum
    And izin talebi formunu gönderirim
    Then izin talebi isteği başarılı olmalı

  Scenario: Profil sayfası bilgileri gösterir
    Given giriş sayfasını açtım
    And geçerli kimlik bilgileri ile formu gönderirim
    When sol menüden "Profil" bağlantısını seçerim
    Then profil kartında oturum açan kullanıcının e-postası görünmeli
