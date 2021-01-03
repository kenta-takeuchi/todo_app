module JwtAuthenticator
  require "jwt"

  SECRET_KEY = Rails.application.secrets.secret_key_base
  ALGORITHM = 'HS256'

  # ヘッダーの認証トークンを復号化してユーザー認証を行う
  def jwt_authenticate
    render json: { status: "ERROR", message: "認証情報が不足しています。" }  if request.headers['Authorization'].blank?
    # 下記のようにヘッダーに設定されているとして、トークンをヘッダーから取得する。
    # headers['Authorization'] = "JWT XXXXX..."
    encoded_token = request.headers['Authorization'].split('JWT ').last
    # トークンを復号化する(トークンが復号できない場合、有効期限切れの場合はここで例外が発生します。)
    payload = decode(encoded_token)
    # Payloadから取得したユーザーIDでログインしているユーザー情報を取得
    @current_user = User.find_by(id: payload["user_id"])
    render json: { status: "ERROR", message: "認証できません。" } if @current_user.blank?
    @current_user
  end

  # 暗号化処理
  def encode(user_id)
    expires_in = 30.minute.from_now.to_i # 再ログインを必要とするまでの期間は30分
    preload = { user_id: user_id, exp: expires_in }
    JWT.encode(preload, SECRET_KEY, ALGORITHM)
  end

  # 復号化処理
  def decode(encoded_token)
    decoded_dwt = JWT.decode(encoded_token, SECRET_KEY, true, algorithm: ALGORITHM)
    decoded_dwt.first
  end

end