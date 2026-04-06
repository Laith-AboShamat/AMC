import { ArrowRightOutlined } from '@ant-design/icons'
import {
  Avatar,
  Button,
  Card,
  Col,
  Collapse,
  ConfigProvider,
  Descriptions,
  Divider,
  Layout,
  List,
  Progress,
  Row,
  Space,
  Statistic,
  Steps,
  Tabs,
  Tag,
  Timeline,
  Typography,
} from 'antd'
import { PortfolioRouteHeader } from '../components/PortfolioRouteHeader.jsx'

const { Content } = Layout
const { Title, Paragraph, Text } = Typography

export function AntdPortfolio({ content, locale, theme, onLocaleChange, onThemeChange }) {
  const isDark = theme === 'dark'
  const navItems = [
    { href: '#executive-summary', label: content.nav.about },
    { href: '#executive-method', label: content.nav.methodology },
    { href: '#executive-services', label: content.nav.services },
    { href: '#executive-contact', label: content.nav.contact },
  ]

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: isDark ? '#d9e2f5' : '#011844',
          colorBgContainer: isDark ? '#172235' : '#ffffff',
          colorBgElevated: isDark ? '#101a2c' : '#ffffff',
          colorText: isDark ? '#e7edf8' : '#191c1e',
          colorTextSecondary: isDark ? '#afbdd8' : '#4a5d8b',
          borderRadius: 18,
        },
      }}
    >
      <PortfolioRouteHeader
        content={content}
        locale={locale}
        theme={theme}
        onLocaleChange={onLocaleChange}
        onThemeChange={onThemeChange}
        navItems={navItems}
      />

      <Content style={{ padding: '0 16px 56px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Card
            id="executive-summary"
            style={{
              borderRadius: 32,
              overflow: 'hidden',
              background: isDark
                ? 'linear-gradient(135deg, #0f1b31 0%, #182947 100%)'
                : 'linear-gradient(135deg, #101828 0%, #1f3354 100%)',
              marginTop: 8,
            }}
            styles={{ body: { padding: 32 } }}
          >
            <Row gutter={[32, 32]} align="bottom">
              <Col xs={24} lg={13}>
                <Space direction="vertical" size={18} style={{ width: '100%' }}>
                  <Tag color="processing" style={{ borderRadius: 999, padding: '6px 12px', width: 'fit-content', fontWeight: 700 }}>
                    {content.selector.designs[2].title}
                  </Tag>
                  <Text style={{ color: 'rgba(232,239,250,0.72)', textTransform: 'uppercase', letterSpacing: '0.22em' }}>
                    {content.hero.eyebrow}
                  </Text>
                  <Title style={{ margin: 0, color: '#f5f8ff', lineHeight: 1.02 }} level={1}>
                    {content.hero.title}
                  </Title>
                  <Paragraph style={{ color: 'rgba(232,239,250,0.86)', fontSize: 16, marginBottom: 0 }}>
                    {content.hero.description}
                  </Paragraph>
                  <Space wrap>
                    <Button type="primary" size="large" icon={<ArrowRightOutlined />}>
                      {content.hero.primaryCta}
                    </Button>
                    <Button size="large" ghost>
                      {content.hero.secondaryCta}
                    </Button>
                  </Space>
                </Space>
              </Col>
              <Col xs={24} lg={11}>
                <Row gutter={[12, 12]}>
                  <Col xs={24}>
                    <Card bordered={false} style={{ borderRadius: 24, background: 'rgba(255,255,255,0.08)' }}>
                      <Space direction="vertical" size={12} style={{ width: '100%' }}>
                        <Text style={{ color: 'rgba(232,239,250,0.72)', textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 700 }}>
                          Executive Snapshot
                        </Text>
                        <Row gutter={[12, 12]}>
                          {content.hero.stats.map((item) => (
                            <Col xs={24} sm={8} key={item.value}>
                              <Statistic title={<span style={{ color: 'rgba(232,239,250,0.72)' }}>{item.label}</span>} value={item.value} valueStyle={{ color: '#ffffff', fontWeight: 800, fontSize: 24 }} />
                            </Col>
                          ))}
                        </Row>
                      </Space>
                    </Card>
                  </Col>
                  <Col xs={24}>
                    <Card bordered={false} style={{ borderRadius: 24, background: 'rgba(255,255,255,0.06)' }}>
                      <Space align="start" size={16}>
                        <Avatar src="/amc1.png" size={64} shape="square" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />
                        <div>
                          <Text style={{ color: 'rgba(232,239,250,0.72)', textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 700 }}>
                            {content.hero.brandMarkTitle}
                          </Text>
                          <Paragraph style={{ color: 'rgba(232,239,250,0.84)', marginTop: 8, marginBottom: 0 }}>
                            {content.hero.brandMarkDescription}
                          </Paragraph>
                        </div>
                      </Space>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>

          <Row gutter={[20, 20]} style={{ marginTop: 24 }}>
            <Col xs={24} lg={16}>
              <Card bordered={false} style={{ borderRadius: 28, height: '100%' }}>
                <Tabs
                  defaultActiveKey="overview"
                  items={[
                    {
                      key: 'overview',
                      label: content.nav.about,
                      children: (
                        <>
                          <Text type="secondary" style={{ textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 700 }}>
                            {content.about.badge}
                          </Text>
                          <Title level={2} style={{ marginTop: 12 }}>{content.about.title}</Title>
                          {content.about.paragraphs.map((paragraph) => (
                            <Paragraph key={paragraph}>{paragraph}</Paragraph>
                          ))}
                        </>
                      ),
                    },
                    {
                      key: 'vision',
                      label: content.about.visionTitle,
                      children: <Paragraph>{content.about.visionText}</Paragraph>,
                    },
                    {
                      key: 'mission',
                      label: content.about.missionTitle,
                      children: <Paragraph>{content.about.missionText}</Paragraph>,
                    },
                  ]}
                />
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card bordered={false} style={{ borderRadius: 28, height: '100%' }}>
                <Text type="secondary" style={{ textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 700 }}>
                  {content.about.practiceAreasTitle}
                </Text>
                <Descriptions column={1} size="small" style={{ marginTop: 18 }}>
                  {content.about.expertise.map((item, index) => (
                    <Descriptions.Item key={item} label={`0${index + 1}`}>
                      {item}
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              </Card>
            </Col>
          </Row>

          <Row gutter={[20, 20]} id="executive-method" style={{ marginTop: 24 }}>
            <Col xs={24} lg={9}>
              <Card bordered={false} style={{ borderRadius: 28, height: '100%' }}>
                <Text type="secondary" style={{ textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 700 }}>
                  {content.methodology.badge}
                </Text>
                <Title level={2} style={{ marginTop: 12 }}>{content.methodology.title}</Title>
                <Paragraph>{content.methodology.description}</Paragraph>
                <Divider />
                <Space direction="vertical" size={14} style={{ width: '100%' }}>
                  {content.hero.highlights.map((item, index) => (
                    <div key={item.label}>
                      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                        <Text strong>{item.label}</Text>
                        <Text type="secondary">{index === 0 ? '92%' : '100%'}</Text>
                      </Space>
                      <Progress percent={index === 0 ? 92 : 100} showInfo={false} strokeColor={index === 0 ? '#2f6fed' : '#22a06b'} />
                    </div>
                  ))}
                </Space>
              </Card>
            </Col>
            <Col xs={24} lg={15}>
              <Card bordered={false} style={{ borderRadius: 28, height: '100%' }}>
                <Timeline
                  mode="left"
                  items={content.methodology.steps.map((step, index) => ({
                    color: index < 2 ? 'green' : index < 4 ? 'blue' : 'gray',
                    label: step.step,
                    children: (
                      <div>
                        <Text strong>{step.title}</Text>
                        <Paragraph style={{ marginTop: 6 }}>{step.description}</Paragraph>
                      </div>
                    ),
                  }))}
                />
              </Card>
            </Col>
          </Row>

          <Card id="executive-services" bordered={false} style={{ borderRadius: 28, marginTop: 24 }}>
            <Row align="bottom" justify="space-between" gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Text type="secondary" style={{ textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 700 }}>
                  {content.services.badge}
                </Text>
                <Title level={2} style={{ marginTop: 12 }}>{content.services.title}</Title>
              </Col>
              <Col xs={24} lg={12}>
                <Paragraph style={{ marginBottom: 0 }}>{content.services.intro}</Paragraph>
              </Col>
            </Row>
            <Collapse
              size="large"
              bordered={false}
              style={{ marginTop: 18, background: 'transparent' }}
              items={content.services.cards.map((service, index) => ({
                key: service.title,
                label: (
                  <Space size={12}>
                    <Tag color={index === 0 ? 'blue' : index === 1 ? 'geekblue' : 'purple'}>{`0${index + 1}`}</Tag>
                    <Text strong>{service.title}</Text>
                  </Space>
                ),
                children: (
                  <Row gutter={[20, 20]}>
                    <Col xs={24} lg={14}>
                      <Paragraph>{service.description}</Paragraph>
                    </Col>
                    <Col xs={24} lg={10}>
                      <Card size="small" style={{ borderRadius: 18, background: isDark ? '#101a2c' : '#f7f9fc' }}>
                        <Text type="secondary">{content.services.impactLabel}</Text>
                        <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>{service.outcome}</Paragraph>
                      </Card>
                    </Col>
                  </Row>
                ),
              }))}
            />
          </Card>

          <Row gutter={[20, 20]} id="executive-contact" style={{ marginTop: 24 }}>
            <Col xs={24} lg={14}>
              <Card bordered={false} style={{ borderRadius: 28, height: '100%' }}>
                <Text type="secondary" style={{ textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 700 }}>
                  {content.contact.badge}
                </Text>
                <Title level={2} style={{ marginTop: 12 }}>{content.contact.title}</Title>
                <Paragraph>{content.contact.description}</Paragraph>
                <Space wrap>
                  <Button type="primary" size="large" href={`tel:${content.contactData.phone.replace(/-/g, '')}`}>
                    {content.contactData.phone}
                  </Button>
                  <Button size="large" href={`mailto:${content.contactData.email}`}>
                    {content.contactData.email}
                  </Button>
                </Space>
                <Divider />
                <Descriptions column={{ xs: 1, md: 2 }}>
                  <Descriptions.Item label={content.about.visionTitle}>{content.about.visionText}</Descriptions.Item>
                  <Descriptions.Item label={content.about.missionTitle}>{content.about.missionText}</Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col xs={24} lg={10}>
              <Card bordered={false} style={{ borderRadius: 28, height: '100%' }}>
                <Text type="secondary" style={{ textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 700 }}>
                  {content.contact.finalPrincipleLabel}
                </Text>
                <Title level={3} style={{ marginTop: 12 }}>{content.contact.finalPrincipleText}</Title>
                <List
                  style={{ marginTop: 18 }}
                  dataSource={content.contact.checklist}
                  renderItem={(item) => (
                    <List.Item>
                      <Space align="start">
                        <Avatar size={28} style={{ backgroundColor: isDark ? '#223556' : '#e8eef8', color: isDark ? '#f5f8ff' : '#011844' }}>
                          {item.slice(0, 1)}
                        </Avatar>
                        <Text>{item}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </ConfigProvider>
  )
}