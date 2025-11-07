Feature: Kullanıcı girişi
  Rails API ayakta olduğu sürece gerçek istekler üzerinden oturum açma akışı doğrulanır.

  Background:
    Given Rails API ayakta
    And API isteklerini izliyorum

  Scenario: Kullanıcı başarılı bir şekilde giriş yapar
    Given giriş sayfasını açtım
    When geçerli kimlik bilgileri ile formu gönderirim
    Then dashboard ekranını görmeliyim
    And özet kartları vardiya sayılarını göstermeli
