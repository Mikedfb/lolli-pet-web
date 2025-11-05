/**
 * API Service - Centraliza todas as chamadas HTTP para o backend
 *
 * Este arquivo gerencia:
 * - Configuração da URL base da API
 * - Autenticação com tokens JWT
 * - Headers padrão para todas as requisições
 * - Tratamento de erros centralizado
 */

// Obtém a URL base da API a partir das variáveis de ambiente
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

/**
 * Interface para respostas de erro da API
 */
export interface ApiError {
  message: string;
  status: number;
  details?: unknown;
}

/**
 * Interface para dados de login
 */
export interface LoginData {
  email: string;
  password: string;
}

/**
 * Interface para dados de cadastro/signup
 */
export interface SignupData {
  nome: string;
  email: string;
  password: string;
  telefone?: string;
}

/**
 * Interface para resposta de autenticação
 */
export interface AuthResponse {
  token: string;
  user: {
    id: string;
    nome: string;
    email: string;
    telefone?: string;
  };
}

/**
 * Obtém o token JWT do localStorage
 */
export const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

/**
 * Salva o token JWT no localStorage
 *
 * @param token - Token JWT recebido do backend
 */
export const setToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

/**
 * Remove o token JWT do localStorage
 */
export const removeToken = (): void => {
  localStorage.removeItem('authToken');
};

/**
 * Salva os dados do usuário no localStorage
 *
 * @param user - Dados do usuário
 */
export const setUser = (user: AuthResponse['user']): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Obtém os dados do usuário do localStorage
 */
export const getUser = (): AuthResponse['user'] | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

/**
 * Remove os dados do usuário do localStorage
 */
export const removeUser = (): void => {
  localStorage.removeItem('user');
};

/**
 * Cria headers padrão para requisições HTTP
 * Inclui o token de autenticação se disponível
 *
 * @param includeAuth - Se true, inclui o token de autenticação no header
 */
const getHeaders = (includeAuth = false): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

/**
 * Função genérica para fazer requisições HTTP
 *
 * @param endpoint - Endpoint da API (ex: '/auth/login')
 * @param options - Opções do fetch
 * @param includeAuth - Se true, inclui o token de autenticação
 * @returns Promise com os dados da resposta
 */
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {},
  includeAuth = false
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;

  console.log(`[API] ${options.method || 'GET'} ${url}`, {
    headers: getHeaders(includeAuth),
    body: options.body ? JSON.parse(options.body as string) : undefined,
  });

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getHeaders(includeAuth),
        ...options.headers,
      },
    });

    // Tenta fazer parse do JSON da resposta
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    console.log(`[API] Response ${response.status}:`, data);

    // Se a resposta não for OK (status 200-299), lança um erro
    if (!response.ok) {
      const error: ApiError = {
        message: data?.message || data || 'Erro ao comunicar com o servidor',
        status: response.status,
        details: data,
      };
      throw error;
    }

    return data as T;
  } catch (error) {
    // Se for um erro da API (já tratado acima), repassa
    if ((error as ApiError).status) {
      throw error;
    }

    // Caso contrário, é um erro de rede ou parsing
    console.error('[API] Erro na requisição:', error);
    throw {
      message: 'Erro ao conectar com o servidor. Verifique sua conexão.',
      status: 0,
      details: error,
    } as ApiError;
  }
};

// ============================================================
// ENDPOINTS DE AUTENTICAÇÃO
// ============================================================

/**
 * Faz login do usuário
 *
 * Envia para: POST /auth/login
 * Body: { email: string, password: string }
 * Retorna: { token: string, user: {...} }
 *
 * @param data - Dados de login (email e senha)
 */
export const login = async (data: LoginData): Promise<AuthResponse> => {
  console.log('[AUTH] Fazendo login com email:', data.email);

  const response = await apiRequest<AuthResponse>(
    '/auth/login',
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  );

  // Salva token e dados do usuário no localStorage
  setToken(response.token);
  setUser(response.user);

  console.log('[AUTH] Login bem-sucedido! Token salvo.');
  return response;
};

/**
 * Registra um novo usuário
 *
 * Envia para: POST /auth/signup (ou /auth/register)
 * Body: { nome: string, email: string, password: string, telefone?: string }
 * Retorna: { token: string, user: {...} }
 *
 * @param data - Dados de cadastro
 */
export const signup = async (data: SignupData): Promise<AuthResponse> => {
  console.log('[AUTH] Registrando novo usuário:', data.email);

  const response = await apiRequest<AuthResponse>(
    '/auth/signup',
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  );

  // Salva token e dados do usuário no localStorage
  setToken(response.token);
  setUser(response.user);

  console.log('[AUTH] Cadastro bem-sucedido! Token salvo.');
  return response;
};

/**
 * Faz logout do usuário
 * Remove token e dados do localStorage
 */
export const logout = (): void => {
  console.log('[AUTH] Fazendo logout...');
  removeToken();
  removeUser();
  console.log('[AUTH] Logout completo. Tokens removidos.');
};

/**
 * Verifica se o usuário está autenticado
 */
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// ============================================================
// ENDPOINTS DE CLIENTES
// ============================================================

/**
 * Cadastra um novo cliente com seus pets
 *
 * Envia para: POST /clientes
 * Headers: Authorization: Bearer {token}
 * Body: { nome, email, telefone, pets: [...] }
 *
 * @param data - Dados do cliente e pets
 */
export const cadastrarCliente = async (data: unknown): Promise<unknown> => {
  console.log('[CLIENTES] Cadastrando novo cliente');

  return apiRequest(
    '/clientes',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    true // Inclui token de autenticação
  );
};

// ============================================================
// ENDPOINTS DE AGENDAMENTOS
// ============================================================

/**
 * Cria um agendamento clínico
 *
 * Envia para: POST /agendamentos/clinico
 * Headers: Authorization: Bearer {token}
 * Body: { clienteId, petId, data, hora, servico, observacoes }
 *
 * @param data - Dados do agendamento clínico
 */
export const agendarClinico = async (data: unknown): Promise<unknown> => {
  console.log('[AGENDAMENTO] Criando agendamento clínico');

  return apiRequest(
    '/agendamentos/clinico',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    true // Inclui token de autenticação
  );
};

/**
 * Cria um agendamento de petshop
 *
 * Envia para: POST /agendamentos/petshop
 * Headers: Authorization: Bearer {token}
 * Body: { clienteId, petId, data, hora, servico, observacoes }
 *
 * @param data - Dados do agendamento petshop
 */
export const agendarPetshop = async (data: unknown): Promise<unknown> => {
  console.log('[AGENDAMENTO] Criando agendamento petshop');

  return apiRequest(
    '/agendamentos/petshop',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    true // Inclui token de autenticação
  );
};

/**
 * Lista todos os agendamentos
 *
 * Envia para: GET /agendamentos
 * Headers: Authorization: Bearer {token}
 * Retorna: Array de agendamentos
 */
export const listarAgendamentos = async (): Promise<unknown[]> => {
  console.log('[AGENDAMENTO] Listando agendamentos');

  return apiRequest(
    '/agendamentos',
    {
      method: 'GET',
    },
    true // Inclui token de autenticação
  );
};

// ============================================================
// ENDPOINTS DE PRONTUÁRIO
// ============================================================

/**
 * Busca prontuários (pode filtrar por cliente ou pet)
 *
 * Envia para: GET /prontuarios?clienteId=xxx&petId=xxx
 * Headers: Authorization: Bearer {token}
 *
 * @param params - Parâmetros de filtro (opcional)
 */
export const buscarProntuarios = async (params?: Record<string, string>): Promise<unknown[]> => {
  console.log('[PRONTUARIO] Buscando prontuários');

  const queryString = params
    ? '?' + new URLSearchParams(params).toString()
    : '';

  return apiRequest(
    `/prontuarios${queryString}`,
    {
      method: 'GET',
    },
    true // Inclui token de autenticação
  );
};

export default {
  // Auth
  login,
  signup,
  logout,
  isAuthenticated,
  getToken,
  setToken,
  removeToken,
  getUser,
  setUser,
  removeUser,

  // Clientes
  cadastrarCliente,

  // Agendamentos
  agendarClinico,
  agendarPetshop,
  listarAgendamentos,

  // Prontuários
  buscarProntuarios,
};
